import {
  useAuthState,
  
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";

import useAdmin from "../../Hooks/useAdmin";
import { signOut } from "firebase/auth";

const RequireAdmin = ({ children }) => {
 
  const [user, loading] = useAuthState(auth);
  
  const [admin, adminLoadnig] = useAdmin(user);
  const location = useLocation();
  if (loading || adminLoadnig) {
    return <Loader />;
  }

  

  if (!user ||!admin) {
    signOut(auth);
    
    
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
     
  }
  
  

 

  
 

  return children;
};

export default RequireAdmin;
