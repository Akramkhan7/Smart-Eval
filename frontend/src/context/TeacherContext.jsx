import { createContext, useContext, useState, useEffect } from "react";

const TeacherContext = createContext();
export const TeacherProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const allDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/teacher/allDetails", {
        credentials: "include",
      });
      let data = await res.json();
      console.log("Teacher Context ", data);
      if (data.subjects) {
        setSubjects(data.subjects);
      }
      if (data.Students) {
        setStudents(data.Students);
      }
    } catch (err) {
      setSubjects(null);
      setStudents(null);
    }
  };

  useEffect(() => {
    allDetails();
  }, []);

  return (
    <TeacherContext.Provider value={{ subjects, students }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => useContext(TeacherContext);
