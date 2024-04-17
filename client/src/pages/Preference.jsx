import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allowNotification, updatePreferenceStart, updatePreferenceSuccess } from "../redux/user/userSlice";
import {getToken} from 'firebase/messaging';
import { messaging } from "../firebase";
export default function Preference() {
  const { currentUser, notification, cityName, type, parking, furnished, bedrooms, bathrooms, minRange, maxRange } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cityName: (cityName===undefined)?"":cityName, 
    notification: (notification===undefined)?false:notification,
    type: (type===undefined)?"rent":type,
    bedrooms: bedrooms===undefined?1:bedrooms,
    bathrooms: bathrooms===undefined?1:bathrooms,
    parking: false,
    furnished: false,
    minRange: minRange===undefined?50:minRange,
    maxRange: maxRange===undefined?100:maxRange
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };
  async function requestPermission () {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //generate the token and store it in the database
      allowNotification(true);
      const token = await getToken(messaging, {vapidKey:'BA2hM6SwzGaHSwd-4GFJHhhXKZWniWAl0AxTAmF3PGMUnpYSJ5JYsGHfLEBb8yyhH9ZQ0_R_p8rLHjEnknUTwJU'});
      console.log('Token generated', token);
      //store the token in the database
      const storeToken = await fetch(`/api/user/store-token/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fcmToken: token,
        })
    });
    if(storeToken.success === false)
    {
      console.log(storeToken.message);
    }
    else 
    {
      console.log('token is stored successfully');
    }
      console.log("Notification permission granted.");
    } else {
      allowNotification(false);
      console.log("Unable to get permission to notify.");
    }
  }
  useEffect(()=>{
    //Req user for the notification permission 
    console.log("Notification permission requested");
    if(notification===false)
      requestPermission();
  },[]);
  console.log(cityName);
  console.log(formData)
  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    if(e.target.id === "notification")
    {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if(e.target.id === "minRange" || e.target.id === "maxRange" || e.target.id === "bedrooms" || e.target.id === "bathrooms")
    {
      setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      dispatch(updatePreferenceStart());
      const res = await fetch(`api/preference/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      dispatch(updatePreferenceSuccess(data));
      // navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Add preferences for <i><small>your </small></i> dream House
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex justify-center flex-col gap-4 flex-1">
          <div className="flex gap-4 justify-center">
            <span className="font-semibold">Allow Notification</span>
            <input type="checkbox" id="notification" className="w-5 rounded-full border-gray-300" onChange={handleChange} checked={formData.notification}/>
          </div>
          <input
            placeholder="city name"
            className="border p-3 rounded-lg"
            id="cityName"
            maxLength="50"
            minLength="4"
            required
            onChange={handleChange}
            defaultValue={cityName}
            value={formData.name}
          />
          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formData.type === "sale"}
                onChange={handleChange}
              />
              <span className="font-semibold">Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formData.type === 'rent'}
                onChange={handleChange}
              />
              <span className="font-semibold">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className="font-semibold">Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className="font-semibold">Furnished</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center font-semibold gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="50"
                required
                className="p-3 border border-gray-300 rounded-lg"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center font-semibold gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="50"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex flex-col items-center font-semibold gap-2">
              <input
                type="number"
                id="minRange"
                min="50"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.minRange}
              />
              <div className="flex flex-col items-center">
                <p>Min Range</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center font-semibold gap-2">
              <input
                type="number"
                id="maxRange"
                min="0"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.maxRange}
              />
              <div className="flex flex-col items-center">
                <p>Max Range</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
          </div>
          <button
            disabled={loading }
            className="bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Updating Wishlist..." : "Add/Update Wishlist"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
