import React, { useState } from "react";
import Card from '../Shared/Card';
import StatusBadge from "../Shared/StatusBadge";
import DetailsModal from "../Shared/DetailsModal";
import { teacherData } from "../Shared/DummyData";

const TeacherDashboard = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      {teacherData.map((exam, index) => (
        <Card key={index}>
          <h2 className="text-xl font-semibold">{exam.examName}</h2>
          <StatusBadge status={exam.status} />

          <p className="text-white/80 mt-2">
            Submissions: {exam.submissions}
          </p>
          <p className="text-white/80">Pending: {exam.pending}</p>

          <button
            onClick={() => setSelected(exam)}
            className="mt-4 w-full py-2 bg-white text-black rounded-lg"
          >
            View Details
          </button>
        </Card>
      ))}

      <DetailsModal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h2 className="text-xl font-bold">{selected.examName}</h2>
            <p>Submissions: {selected.submissions}</p>
            <p>Pending: {selected.pending}</p>
            <StatusBadge status={selected.status} />
          </>
        )}
      </DetailsModal>
    </div>
  );
};

export default TeacherDashboard;
