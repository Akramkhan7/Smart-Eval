import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const allDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/allDetails", {
        credentials: "include",
      });
      let data = await res.json();
      console.log(data.Teachers);
      if (data.subjects) {
        setSubjects(data.subjects);
      }
      if (data.Teachers) {
        setTeachers(data.Teachers);
      }
    } catch (err) {
      setTeachers(null);
      setSubjects(null);
    }
  };

  useEffect(() => {
    allDetails();
  }, []);

  return (
    <AdminContext.Provider
      value={{ subjects, teachers, setTeachers, setSubjects }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
