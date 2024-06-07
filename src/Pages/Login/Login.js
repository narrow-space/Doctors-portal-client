import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
useSignInWithEmailAndPassword,
useSignInWithGoogle,
} 
from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader";
import { useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import useToken from "../../Hooks/useToken";
import Swal from 'sweetalert2'
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState(null);
  const [sendPasswordResetEmail] =
  useSendPasswordResetEmail(auth);
  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
  useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
   const location = useLocation();
   let from = location.state?.from?.pathname || "/";
 console.log(error?.message)
   const [token]=useToken(user || gUser)

  useEffect(() => {
    if(token) {
    
        navigate(from,{replace:true});
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          
        })
   
    }
  }, [token, navigate, from]);

  let singninErrors;

  if (error?.message === "Firebase: Error (auth/invalid-login-credentials).") {
    singninErrors = (
      <div
        className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
        role="alert"
      >
        User not found
      </div>
    );
  }

  if (error?.message === "Firebase: Error (auth/invalid-login-credentials).") {
    singninErrors = (
      <div
        className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 "
        role="alert"
      >
        Password Wrong
      </div>
    );
  }

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange", // I want to change it to onBlur
  });
  const { isValid, errors } = formState;

  const onSubmit = (data) => {
    setEmail(data?.email);
    signInWithEmailAndPassword(data.email, data.password);
    
    
  };

  // if (loading || gLoading) {
  //   return <Loader />;
  // }

  if(gUser){
    const gUserinfo={
      name: gUser?.user?.displayName,
      email: gUser?.user?.email,
      photoURL: gUser?.user?.photoURL,
 
     }
     
 
      axios.put('https://doctors-portal-server-hiuzvttvk-narrow-spaces-projects.vercel.app/alluserinfo',gUserinfo).then((res)=>{
      const data=res.data;
      console.log(data);
    })
   }

  return (
    <div className="flex h-screen justify-center items-center dark:bg-black dark:text-white ">
      <div className="card w-96 dark:bg-black dark:text-white shadow-xl">
        <div className="card-body dark:bg-black  dark:text-white ">
          <div className="flex flex-col w-full border-opacity-50">
            <h1 className="text-xl text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Adress is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "please enter a valid email adress",
                    },
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered dark:text-black w-full max-w-xs"
                />

                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "password must be 6 character or long",
                    },
                  })}
                  type="password"
                  placeholder="Your password"
                  className="input input-bordered w-full max-w-xs dark:text-black "
                />

                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              <small
                onClick={async () => {
                  await sendPasswordResetEmail(email);
                  alert("Sent email");
                }}
                className=" font-semibold "
              >
                Forgot password ?
              </small>
              {singninErrors}

              <button
                disabled={!isValid}
               
                type="submit"
                className="btn dark:btn-close-white w-full max-w-xs"
              >
                login
              </button>
            </form>

            <p className="font-semibold ">
              <small>
                New to Doctors Portal ?
                <Link className="text-secondary mx-2" to="/register">
                  create new account
                </Link>
              </small>
            </p>
            <div className="divider">OR</div>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline dark:btn-close-white"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
