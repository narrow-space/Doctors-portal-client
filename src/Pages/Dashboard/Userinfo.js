import { data } from 'autoprefixer';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Paginationpage from '../Shared/Paginationpage';

const Userinfo = () => {
    const theme=localStorage.getItem('darktheme')
    const [userInfo,setUserInfo]=useState([])
    const [darktheme,setDarktheme]=useState("")
    const [showPerPage, setShowPerPage] = useState(4);
    const [pagination, setPagination] = useState({
      start: 0,
      end: showPerPage,
    });
  
    const onpaginationChange = (start, end) => {
      setPagination({ start: start, end: end });
    };
    console.log(darktheme);
  useEffect(()=>{
    axios.get('https://doctors-portal-server-one-psi.vercel.app/userinfo').then((res)=>{
        setUserInfo(res.data);
    })
  },[])
  console.log(typeof(userInfo));

  const handlethemeswitcher=()=>{
    setDarktheme(darktheme === "night" ? "light" : "night");
    localStorage.setItem("Darktheme", "light");
 }
  
 useEffect(() => {
  if (
    localStorage.Darktheme === "night" ) {
    setDarktheme("night");
  } else {
    setDarktheme("light");
  }
}, []);

useEffect(() => {
  if (darktheme === "night") {
    
    localStorage.setItem("Darktheme", "night");
  }
}, [darktheme]);
   
   

  
    return (
        <div data-theme={`${darktheme==="night"?"black":"light"}`}>
            <div  className="overflow-x-auto w-full">
  <table  className={`table w-full  ${darktheme==="light"?"text-black":"text-white"}`}>
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th>
          <label>
            <input onClick={handlethemeswitcher} type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>IMAGE</th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      
     {
        userInfo.slice(pagination.start, pagination.end).map((ui,index)=>(<tr key={ui._id}>
            <th>
              {index+1}
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={ui.photoURL} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{ui.name}</div>
                  {/* <div className="text-sm opacity-50">Brazil</div> */}
                </div>
              </div>
            </td>
            <td>
            {ui.name}
              <br/>
              {/* <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span> */}
            </td>
            <td>
            {ui.email}
              <br/>
              {/* <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span> */}
            </td>
            {/* <td>Indigo</td> */}
            <th>
              {/* <button className="btn btn-ghost btn-xs">details</button> */}
            </th>
          </tr>))
     }
      
    </tbody>
  
   
    
  </table>
</div>
{userInfo.length>=4?<Paginationpage
     showPerPage={showPerPage}
     onpaginationChange={onpaginationChange}
     total={userInfo?.length}
    
     ></Paginationpage>:null}
        </div>
    );
};

export default Userinfo;