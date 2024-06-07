import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import Swal from 'sweetalert2';
import Paginationpage from "../Shared/Paginationpage";

const Myappiontments = () => {
  const [user] = useAuthState(auth);
  const accesstoken = localStorage.getItem("accesstoken");
  const navigate = useNavigate();
  const [showPerPage, setShowPerPage] = useState(4);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onpaginationChange = (start, end) => {
    setPagination({ start, end });
  };

  const {
    data: appiontments,
    isLoading,
    refetch,
  } = useQuery(
    "appiontments",
    async () => {
      const response = await fetch(
        `https://doctors-portal-server-one-psi.vercel.app/booking?email=${user?.email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          navigate("/");
          signOut(auth);
          localStorage.removeItem("photoURL");
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("displayName");
        }
        throw new Error("Network response was not ok");
      }

      return response.json();
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  const removeAppiontment = (email) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-error',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this Appiontment!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://doctors-portal-server-one-psi.vercel.app/AppiontmentDelete/${email}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              refetch();
            }
          })
          .catch((error) => {
            console.log(error);
          });

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your Appiontment delete Successfully.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Appiontment is safe 😄',
          'error'
        );
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto w-full">
        {appiontments?.length ? (
          <table className="w-full">
            <thead className="border-b-4 border-secondary text-2xl dark:bg-black dark:text-white">
              <tr>
                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Serial</th>
                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Name</th>
                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Treatment</th>
                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Time</th>
                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Phone No</th>
              </tr>
            </thead>
            <tbody className="dark:bg-black dark:text-white">
              {appiontments.slice(pagination.start, pagination.end).map((a, index) => (
                <tr key={index} className="dark:border-b border-secondary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{a.patientName}</td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{a.treatment}</td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{a.slot}</td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{a.number}</td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    <button onClick={() => removeAppiontment(a.email)} className="btn btn-xs btn-accent">
                      Delete Appiontment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-screen overflow-hidden">
            <h2 className="text-2xl dark:text-white">No APPOINTMENTS YET!! 😢</h2>
          </div>
        )}
      </div>
      {appiontments?.length >= 4 && (
        <Paginationpage
          showPerPage={showPerPage}
          onpaginationChange={onpaginationChange}
          total={appiontments.length}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Myappiontments;
