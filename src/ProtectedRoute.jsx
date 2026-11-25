import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";


const ProtectedRoute = ({children}) => {
    const [user, setuser] = useState(null);
    const[loading, setloading] = useState(true);

   useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (currentUser) =>{
        setuser(currentUser);
        setloading(false);
    });
    return unsubscibe;
   }, []);
   if(loading) return <p>Loading...</p>;
   if(!user) return <Navigate to="/login" replace/>;
   return children; 
};
export default ProtectedRoute;