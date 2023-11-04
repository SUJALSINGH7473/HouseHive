import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setfileperc] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(fileUploadError);
  console.log(filePerc);
  const fileRef = useRef(null);

  useEffect(()=>{
    if(file)
    {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed',
     (snapshot) =>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setfileperc(Math.round(progress));
      },
      (error)=>{
        setfileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL)=>{
          setFormData({...formData, avatar: downloadURL});
        })
      });
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"></input>
        <img
          onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm text-center">
        {fileUploadError? (<span className="text-red-700">Error Image Upload(image must be less than 2mb)</span>):
        filePerc>0 && filePerc<100 ? (<span className="text-slate-700">{`Uploading ${filePerc}%`}</span>):(filePerc==100?(<span className="text-green-700">Image Successfully Uploaded!</span>):"" )}
        </p>
        <input type="text" id="username" placeholder="username" className="border p-3 rounded-lg" ></input>
        <input type="email" id="email" placeholder="email" className="border p-3 rounded-lg" ></input>
        <input type="text" id="password" placeholder="password" className="border p-3 rounded-lg" ></input>
        <button className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80">Update</button>      
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
