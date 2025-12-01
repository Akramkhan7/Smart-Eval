import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]); // This state exists, which is good

  const allDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/allDetails", {
        credentials: "include", // This is important for cookies, good job keeping it
      });
      let data = await res.json();
      console.log("Admin Context ", data);
      
      if (data.subjects) {
        setSubjects(data.subjects);
      }
      if (data.Teachers) {
        setTeachers(data.Teachers);
      }
      if (data.Students) {
        setStudents(data.Students);
      }
    } catch (err) {
      console.error(err);
      setTeachers([]); // Better to set empty array than null to avoid crashes
      setSubjects([]);
      setStudents([]);
    }
  };

  useEffect(() => {
    allDetails();
  }, []);

  return (
    <AdminContext.Provider
      // FIX: Added 'students' to this list so components can use it
      value={{ subjects, teachers, students, setTeachers, setSubjects }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);