// plagiarismEngine.js

const SimHash = require("simhash");
const simhash = new SimHash();
const OpenAI = require("openai");

// ⚠️ Set your OpenAI key in .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 0. PREPROCESSING HELPERS

function cleanText(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(text = "") {
  return text
    .split(/[\.\?\!\n\r]/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function tokenize(text = "") {
  return cleanText(text).split(" ").filter(Boolean);
}

function getNgrams(words, n = 5) {
  const grams = [];
  for (let i = 0; i <= words.length - n; i++) {
    grams.push(words.slice(i, i + n).join(" "));
  }
  return grams;
}

function cosineSimilarity(vecA, vecB) {
  let dot = 0,
    magA = 0,
    magB = 0;

  const len = Math.min(vecA.length, vecB.length);
  for (let i = 0; i < len; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }

  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// 1. LAYER 1 – EXACT PHRASE (N-GRAM) OVERLAP

function ngramOverlapScore(textA, textB, n = 5) {
  const aWords = tokenize(textA);
  const bWords = tokenize(textB);

  if (aWords.length < n || bWords.length < n) return 0;

  const aNgrams = new Set(getNgrams(aWords, n));
  const bNgrams = new Set(getNgrams(bWords, n));

  let common = 0;
  for (const g of aNgrams) {
    if (bNgrams.has(g)) common++;
  }

  const minSize = Math.min(aNgrams.size, bNgrams.size);
  if (minSize === 0) return 0;

  return common / minSize; // 0–1
}

// 2. LAYER 2 – SIMHASH (NEAR-DUPLICATE DETECTION)

function simhashLayer(textA, textB) {
  const cA = cleanText(textA);
  const cB = cleanText(textB);

  const hashA = simhash.hash(cA);
  const hashB = simhash.hash(cB);

  const distance = simhash.hamming(hashA, hashB); // 0 = same
  const maxBits = 64; // usually 64-bit
  const similarity = 1 - distance / maxBits; // 0–1

  return { distance, similarity };
}

// 3. LAYER 3 – LEXICAL SENTENCE SIMILARITY (WORD-BASED)

function bagOfWordsVector(sentence, vocab) {
  const words = tokenize(sentence);
  const freq = {};
  words.forEach((w) => {
    freq[w] = (freq[w] || 0) + 1;
  });

  return vocab.map((w) => freq[w] || 0);
}

function lexicalSentenceLayer(sentencesA, sentencesB) {
  if (!sentencesA.length || !sentencesB.length) {
    return { highlySimilarCount: 0, ratio: 0 };
  }

  // Build vocab from both docs
  const vocabSet = new Set();
  sentencesA.concat(sentencesB).forEach((s) => {
    tokenize(s).forEach((w) => vocabSet.add(w));
  });
  const vocab = Array.from(vocabSet);

  let highlySimilarCount = 0;
  const threshold = 0.85; // high lexical match

  for (const sA of sentencesA) {
    const vecA = bagOfWordsVector(sA, vocab);
    let best = 0;

    for (const sB of sentencesB) {
      const vecB = bagOfWordsVector(sB, vocab);
      const sim = cosineSimilarity(vecA, vecB);
      if (sim > best) best = sim;
    }

    if (best >= threshold) {
      highlySimilarCount++;
    }
  }

  const ratio = highlySimilarCount / sentencesA.length;
  return { highlySimilarCount, ratio }; // ratio 0–1
}

// 4. LAYER 4 – SEMANTIC SENTENCE SIMILARITY (EMBEDDINGS)

async function embedTexts(texts) {
  if (!texts.length) return [];

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts.map((t) => cleanText(t)),
  });

  return response.data.map((d) => d.embedding);
}

async function semanticSentenceLayer(sentencesA, sentencesB) {
  if (!sentencesA.length || !sentencesB.length) {
    return { veryHighSemanticMatches: 0, ratio: 0 };
  }

  const [embA, embB] = await Promise.all([
    embedTexts(sentencesA),
    embedTexts(sentencesB),
  ]);

  const threshold = 0.92; // very high semantic similarity
  let veryHighSemanticMatches = 0;

  for (let i = 0; i < sentencesA.length; i++) {
    const eA = embA[i];
    let best = 0;

    for (let j = 0; j < sentencesB.length; j++) {
      const eB = embB[j];
      const sim = cosineSimilarity(eA, eB);
      if (sim > best) best = sim;
    }

    if (best >= threshold) {
      veryHighSemanticMatches++;
    }
  }

  const ratio = veryHighSemanticMatches / sentencesA.length;
  return { veryHighSemanticMatches, ratio };
}

// 5. OPTIONAL LAYER – DOC-LEVEL EMBEDDINGS

async function documentEmbeddingLayer(textA, textB) {
  const [embA, embB] = await embedTexts([textA, textB]);
  const sim = cosineSimilarity(embA, embB);
  return sim; // 0–1, but we'll use this only as supportive signal
}

// 6. FINAL DECISION LOGIC

function decidePlagiarism({
  ngramScore,
  simhashSim,
  lexicalRatio,
  semanticRatio,
  docSim,
}) {
  // Defaults: everything safe
  let isPlagiarized = false;
  const reasons = [];

  // Rule 1: Exact phrase / structure copy
  if (ngramScore >= 0.3 && simhashSim >= 0.85) {
    isPlagiarized = true;
    reasons.push("High exact phrase overlap & near-duplicate structure");
  }

  // Rule 2: Many sentences lexically same
  if (lexicalRatio >= 0.4) {
    isPlagiarized = true;
    reasons.push("Many sentences have almost identical wording");
  }

  // Rule 3: Many sentences semantically almost identical
  if (semanticRatio >= 0.4) {
    isPlagiarized = true;
    reasons.push(
      "Many sentences are semantically almost identical (likely copy + slight rephrase)"
    );
  }

  // Rule 4 (soft): Full document very close + other evidence
  if (
    !isPlagiarized &&
    docSim >= 0.9 &&
    (ngramScore >= 0.2 || lexicalRatio >= 0.3)
  ) {
    isPlagiarized = true;
    reasons.push(
      "Documents are almost identical overall with notable phrase or wording overlap"
    );
  }

  // IMPORTANT:
  // If only doc-level similarity high but ngram + sentence ratios low → treat as SAFE
  // (same concept / topic, but independently written)

  if (!isPlagiarized && docSim >= 0.9) {
    reasons.push(
      "High overall similarity, but low sentence-level and phrase matching → likely same concept, not plagiarism"
    );
  }

  return { isPlagiarized, reasons };
}

// 7. MAIN PIPELINE FUNCTION

// Compare ONE new assignment against ONE old assignment
async function compareAssignments(newTextRaw, oldTextRaw) {
  const newText = cleanText(newTextRaw);
  const oldText = cleanText(oldTextRaw);

  const newSentences = splitSentences(newTextRaw);
  const oldSentences = splitSentences(oldTextRaw);

  // Layer 1
  const ngramScore = ngramOverlapScore(newText, oldText);

  // Layer 2
  const { similarity: simhashSim, distance: simhashDist } = simhashLayer(
    newText,
    oldText
  );

  // Layer 3
  const { ratio: lexicalRatio, highlySimilarCount } = lexicalSentenceLayer(
    newSentences,
    oldSentences
  );

  // Layer 4
  const { ratio: semanticRatio, veryHighSemanticMatches } =
    await semanticSentenceLayer(newSentences, oldSentences);

  // Optional Layer 5
  const docSim = await documentEmbeddingLayer(newText, oldText);

  const decision = decidePlagiarism({
    ngramScore,
    simhashSim,
    lexicalRatio,
    semanticRatio,
    docSim,
  });

  return {
    ngramScore,
    simhashSimilarity: simhashSim,
    simhashDistance: simhashDist,
    lexicalHighlySimilarSentences: highlySimilarCount,
    lexicalRatio,
    semanticVeryHighMatches: veryHighSemanticMatches,
    semanticRatio,
    documentSimilarity: docSim,
    ...decision,
  };
}

// 8. COMPARE NEW ASSIGNMENT WITH MANY OLD ASSIGNMENTS

/**
 * oldAssignments = [
 *   { id: "a1", studentId: "S1", text: "..." },
 *   { id: "a2", studentId: "S2", text: "..." },
 *   ...
 * ]
 */
async function checkAgainstAllAssignments(newTextRaw, oldAssignments = []) {
  const results = [];

  for (const old of oldAssignments) {
    const comparison = await compareAssignments(newTextRaw, old.text);
    results.push({
      againstId: old.id,
      againstStudentId: old.studentId,
      ...comparison,
    });
  }

  // Find max suspicious result
  let mostSuspicious = null;
  for (const r of results) {
    if (!mostSuspicious) {
      mostSuspicious = r;
      continue;
    }
    if (r.documentSimilarity > mostSuspicious.documentSimilarity) {
      mostSuspicious = r;
    }
  }

  return {
    mostSuspicious,
    allResults: results,
  };
}

module.exports = {
  compareAssignments,
  checkAgainstAllAssignments,
};
