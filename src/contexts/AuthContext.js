import { createContext, useEffect, useState } from "react";
import { userObserver } from "./firebase";
import { set, ref, push, onValue, update, getDatabase } from "firebase/database";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
    read();
    userObserver(setCurrentUser);
    
  }, []);

       //! read islemi icin! Yani; dataya gönderdigimiz verileri geri cagirmak icin!
 const read = () => {
  const db = getDatabase();
  const userRef = ref(db, "card");
  onValue(userRef, (snapshot) => {
    const cards = snapshot.val();
    const contactArray = [];
    for (let id in cards) {
      contactArray.push({ id, ...cards[id] });
    }
    setCards(contactArray);
  });
  
};

console.log(cards);

 

  return (
    <AuthContext.Provider value={{ currentUser, cards }}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthContextProvider;
