import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const allSubjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/student/allSubjects", {
        credentials: "include",
      });
      let data = await res.json();
      if (data.subjects) {
        data = data.subjects;
      }
      if (data) {
        console.log("User Context:", data);
        setSubjects(data);
      } else {
        setSubjects(null);
      }
    } catch (err) {
      setSubjects(null);
    }
  };

  useEffect(() => {
    allSubjects();
  }, []);

  return (
    <UserContext.Provider value={{ subjects, setSubjects }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
