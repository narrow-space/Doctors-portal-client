import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (User) => {
  
  
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = User?.user?.email;

    const currentuser = { email: email};
    console.log(currentuser);

    if (email) {
      axios
        .put(`https://doctors-portal-server-one-psi.vercel.app/user/${email}`,currentuser)
        .then(function (response) {
          // handle success
          console.log(response.data);
          const accesstoken = response.data.token;
          localStorage.setItem("accesstoken", accesstoken);
          setToken(accesstoken);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, [User]);
  return [token];
};
export default useToken;
