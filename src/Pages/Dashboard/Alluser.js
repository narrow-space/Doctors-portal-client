import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import Paginationpage from "../Shared/Paginationpage";

import Userrow from "./Userrow";

const Alluser = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  const [showPerPage, setShowPerPage] = useState(6);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onpaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  const { data, isLoading, refetch } = useQuery(
    "users",
    async () =>
      await fetch("https://doctors-portal-server-chi-ten.vercel.app/alluser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }).then((res) => res.json())
  );
 
 console.log(data);

  if (isLoading) {
    return <Loader />;
  }
  
 
  return (
    <div >
      <div className="overflow-x-auto w-full">
        <table
          className=" w-full dark:text-white"
        >
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
                Serial
              </th>
              <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
                Email
              </th>
              
              <th scope="col" class="text-sm font-medium  px-6 py-4 text-left">
                Action
              </th>
              <th scope="col" class="text-sm font-medium  px-6 py-4 text-left">
                Action
              </th>
             
            </tr>
          </thead>
          <tbody className="dark:bg-black dark:text-white  ">
            { Object.entries(data).slice(pagination.start, pagination.end).map((user, index) => {
             
              
               return <Userrow
                  key={user[1]._id}
                  user={user[1]}
                  index={index}
                  refetch={refetch}
                ></Userrow>
              
            })}
          </tbody>
        </table>
      </div>
      {data.length >= 4 ? (
        <Paginationpage
          showPerPage={showPerPage}
          onpaginationChange={onpaginationChange}
          total={data?.length}
        ></Paginationpage>
      ) : null}
    </div>

    // <div className="my-3">
    //   <h2>here is all users{data?.length}</h2>
    //   <div class="flex flex-col  ">
    //     <div class="sm:-mx-6 lg:-mx-8">
    //       <div class=" py-2 inline-block min-w-full sm:px-6 lg:px-8">
    //         <div class=" ">
    //           <table class="overflow-x-auto w-full ">
    //             <thead class="border-b-4 border-secondary text-2xl dark:bg-black dark:text-white  ">
    //               <tr>
    //                 <th
    //                   scope="col"
    //                   class="text-sm font-medium px-6 py-4 text-left"
    //                 >
    //                   Serial
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   class="text-sm font-medium px-6 py-4 text-left"
    //                 >
    //                 Email
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   class="text-sm font-medium  px-6 py-4 text-left"
    //                 >
    //                  Action
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   class="text-sm font-medium  px-6 py-4 text-left"
    //                 >
    //                   Action
    //                 </th>
    //                 {/* <th
    //                   scope="col"
    //                   class="text-sm font-medium  px-6 py-4 text-left"
    //                 >
    //                   phone No
    //                 </th> */}
    //               </tr>
    //             </thead>
    //             <tbody className="dark:bg-black dark:text-white  ">

    //               {data.slice(pagination.start, pagination.end)
    //                 .map((user, index) => (

    //                     <Userrow
    //                       key={user._id}
    //                       user={user}
    //                       index={index}
    //                       refetch={refetch}
    //                     ></Userrow>

    //                 ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    //   < Paginationpage
    //       showPerPage={showPerPage}
    //       onpaginationChange={onpaginationChange}
    //       total={data?.length}
    //     ></Paginationpage>
    // </div>
  );
};

export default Alluser;
