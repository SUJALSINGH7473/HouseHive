import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  notification:false,
  cityName: null,
  type: 'rent',
  parking: false,
  furnished: false,
  bedrooms: 2,
  bathrooms: 1,
  minRange: 50,
  maxRange: 1000
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.rest;
      state.loading = false;
      state.error = null;
      state.notification = action.payload.preference.notification;
      state.cityName = action.payload.preference.cityName;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    allowNotification: (state) => {
      state.notification = true;
    },
    disallowNotification: (state) => {
      state.notification = false;
    },
    signOutUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
        state.notification = false;
        state.cityName = null;
        state.type = 'rent';
        state.parking = false;
        state.furnished = false;
        state.bedrooms = 2;
        state.bathrooms = 1;
        state.minRange = 50;
        state.maxRange = 1000;

      },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePreferenceStart: (state) =>{
      state.loading = true;
    },
    updatePreferenceSuccess: (state, action) =>{
      state.cityName = action.payload.preference.cityName;
      state.type = action.payload.preference.type;
      state.parking = action.payload.preference.parking;
      state.furnished = action.payload.preference.furnished;
      state.bedrooms = action.payload.preference.bedrooms;
      state.bathrooms = action.payload.preference.bathrooms;
      state.minRange = action.payload.preference.minRange;
      state.maxRange = action.payload.preference.maxRange;
      state.notification = action.payload.preference.notification;
      state.loading = false;
      state.error = null;
    },
    updatePreferenceFailure: (state, action) =>{
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updatePreferenceFailure,
  updatePreferenceStart,
  updatePreferenceSuccess,
  allowNotification,
  disallowNotification
} = userSlice.actions;
export default userSlice.reducer;