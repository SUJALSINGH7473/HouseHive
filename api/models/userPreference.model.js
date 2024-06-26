import mongoose from "mongoose";
const userPreferenceSchema = new mongoose.Schema({
      cityName: {
        type: String,
        required: true,
      },
      notification: {
        type: Boolean,
        required: false
      },
      minRange:{
        type: Number,
        required: true,
      },
      maxRange:{
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: false,
      },
      bedrooms: {
        type: Number,
        required: false,
      },
      furnished: {
        type: Boolean,
        required: false,
      },
      parking: {
        type: Boolean,
        required: false,
      },
      type: {
        type: String,
        required: true,
      },
      userRef: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
);

const UserPreference = mongoose.model("UserPreference", userPreferenceSchema);
export default UserPreference;