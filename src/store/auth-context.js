import React, { useEffect, useState, useContext } from "react";
import fireDb from "../firebase";
import { getAuth } from "firebase/auth";

//2.
export const AuthContext = React.createContext();

//3.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin,setAdmin] = useState(null)
const auth = getAuth(fireDb);

const fire = fireDb.database().ref();

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (user !== null) {
        fire.child(`Doctors/${user.uid}`).once('value', snapshot => {
            if (snapshot.val().type === "Admin") {
                setAdmin({...snapshot.val()})
            }
        })
    }
    
}, [])

  return (
    <AuthContext.Provider value={{ user , admin}}>{children}</AuthContext.Provider>
  );
};

