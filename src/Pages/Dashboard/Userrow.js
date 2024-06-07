import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'
const Userrow = ({ user, index,refetch }) => {
  const { email, role } = user;

  const makeAdmin = () => {

    const swalWithBootstrapButtons = Swal.mixin({
     
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-error',
        
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "are you sure make this User for Admin!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Make Admin!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const accesstoken = localStorage.getItem("accesstoken");
        fetch(`https://doctors-portal-server-one-psi.vercel.app/user/admin/${email}`,{
          method:'PUT',
          headers:{
            Authorization:`Bearer ${accesstoken}`,
          }
        })
        .then(res=>{
          if(res.status ===401){
          toast.error('Failed to make an Admin')
          }
         return  res.json()
        })
        .then(data=>{
          if(data.modifiedCount >0 ){
           
           
            refetch()
        }
        })
  
        swalWithBootstrapButtons.fire(
          'Confirm!',
          'Make an Admin Successfully.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Making Admin Canceled 😄',
          'error'
        )
      }
    })
  


    
    
};

const removeUser=()=>{
  const accesstoken = localStorage.getItem("accesstoken");

  const swalWithBootstrapButtons = Swal.mixin({
     
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-error',
      
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this User!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://doctors-portal-server-one-psi.vercel.app/user/admin/${email}`,{
        method:'DELETE',
        headers:{
          Authorization:`Bearer ${accesstoken}`,
        }
      })
      .then(res=>{
        if(res.status ===401){
          toast.error("Failed to delete user")
         
        }
       return  res.json()
      })
      .then(data=>{
        if(data.deletedCount >0 ){
         
         
          refetch()
      }
      })

      swalWithBootstrapButtons.fire(
        'Deleted!',
        'User deleted Successfully.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'User is safe 😄',
        'error'
      )
    }
  })






  
}
  return (
    <tr key={user._id} class="dark:border-b border-secondary ">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ">
        {index + 1}
      </td>
      <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
        {user.email}
      </td>
      
      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap ">
        <div className="btn-group">
          {role === "admin" ? (
            <div className="badge bg-[#F28C18] border-none text-black">Admin</div>
          ) : (
            <button
              onClick={makeAdmin}
              data-theme="halloween"
              className="btn btn-xs btn-active"
            >
              Make Admin
            </button>
          )}
        </div>
      </td>
      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap  ">
        <div className="btn-group">
         
         <button disabled={  email === "hximranhasan@gmail.com"} onClick={removeUser} data-theme="forest" className="btn btn-xs btn-active">
          Remove User
        </button>
         
        </div>
      </td>
    </tr>
  );
};

export default Userrow;
