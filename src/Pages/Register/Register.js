import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth, { storage } from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader";
import useToken from "../../Hooks/useToken";
import axios from "axios";
import { Line } from 'rc-progress';
import Swal from "sweetalert2";

const Register = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const [token] = useToken(user || gUser);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid, errors } = formState;

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      const uploadImage = () => {
        const storageRef = ref(storage, `/images/${Date.now()}${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentage(progress);
          },
          (error) => {
            console.error("Upload failed:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUrl(downloadURL);
              setPercentage(0);
            });
          }
        );
      };
      uploadImage();
    }
  }, [image]);

  const onSubmit = async (data) => {
    if (url) {
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: url,
      };
      await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({ displayName: data.name, photoURL: url });

      axios.put('https://doctors-portal-server-hiuzvttvk-narrow-spaces-projects.vercel.app/alluserinfo', userInfo).then((res) => {
        console.log(res.data);
      });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/appointment");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registration Successful',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  }, [token, navigate]);

  if (loading || gLoading || updating) {
    return <Loader />;
  }

  const handleImgSaveFromLocalStorage = async () => {
    localStorage.setItem("photoURL", url);
  };

  if (gUser) {
    const gUserinfo = {
      name: gUser.user.displayName,
      email: gUser.user.email,
      photoURL: gUser.user.photoURL,
    };
    axios.put('https://doctors-portal-server-hiuzvttvk-narrow-spaces-projects.vercel.app/alluserinfo', gUserinfo).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="card w-96 dark:text-white shadow-2xl">
        <div className="card-body">
          <div className="flex flex-col w-full border-opacity-50">
            <h1 className="text-xl text-center">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text dark:text-white">Name</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs dark:text-black"
                />
                {errors.name && <span className="label-text text-red-500">{errors.name.message}</span>}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email Address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs dark:text-black"
                />
                {errors.email && <span className="label-text text-red-500">{errors.email.message}</span>}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  type="password"
                  placeholder="Your password"
                  className="input input-bordered w-full max-w-xs dark:text-black"
                />
                {errors.password && <span className="label-text text-red-500">{errors.password.message}</span>}
              </div>
              <label className="label">Upload Your Avatar</label>
              <div className="w-full bg-gray-200 rounded-full">
                {percentage > 0 && percentage <= 100 && (
                  <Line percent={percentage} strokeWidth={4} strokeColor="#0FCFEC" />
                )}
              </div>
              <div className="flex justify-center">
                <div className="mb-3 w-96">
                  <input
                    onChange={handleImageChange}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>
              {error && <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3" role="alert">Email already exists</div>}
              <button
                onClick={handleImgSaveFromLocalStorage}
                disabled={!isValid || !url || percentage > 0}
                type="submit"
                className={`btn dark:btn-close-white w-full max-w-xs ${percentage > 0 && percentage <= 100 ? "loading" : null}`}
              >
                {percentage > 0 && percentage <= 100 ? "Image uploading..." : "Signup"}
              </button>
            </form>
            <p className="font-semibold">
              <small>
                Already have an account?
                <Link className="text-secondary mx-2" to="/login">Please login</Link>
              </small>
            </p>
            <div className="divider">OR</div>
            <button
              onClick={signInWithGoogle}
              className="btn dark:btn-close-white btn-outline"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
