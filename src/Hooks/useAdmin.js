import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"


const useAdmin=(user)=>{
 const [admin,setAdmin]=useState(false)
 const [adminLoadnig,setAdminLoading]=useState(true)
 useEffect(()=>{
    
    const email=user?.email;
    const accesstoken = localStorage.getItem("accesstoken");
  const url = `https://doctors-portal-server-one-psi.vercel.app/admin/${email}`;
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
    if(email){
        axios.get(url,config).then((res)=>{
           setAdmin(res.data.admin)
           setAdminLoading(false)
        })
    }
  
 },[])
 return [admin,adminLoadnig]


}
export default useAdmin;