import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';


const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin]=useAdmin(user)
    return (
  <div  className='dark:bg-black dark:text-white  '>
          <div className="drawer drawer-mobile ">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle " />
  <div class="drawer-content">
    
    {/* <!-- Page content here --> */}
   
    <Outlet />
    
  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay "></label> 
    <ul class="menu overflow-y-auto w-48  dark:bg-black text-black bg-gray-200  dark:text-white">
      {/* <!-- Sidebar content here --> */}
      <li><Link to="/dashboard">MY Appiontments</Link></li>
      <li><Link to="/dashboard/review">Reviews</Link></li>
      <li><Link to="/dashboard/history">My History</Link></li>
     {
      admin&& <li><Link to="/dashboard/alluser">All User</Link></li>
     }
     {
      admin&& <li><Link to="/dashboard/userinfo">UserInfo</Link></li>
     }
    </ul>
  
  </div>
</div>
  </div>
    );
};

export default Dashboard;