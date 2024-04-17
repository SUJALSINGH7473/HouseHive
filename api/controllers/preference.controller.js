import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
import UserPreference from "../models/userPreference.model.js";

export const updatePreference = async (req, res, next) => {
  try {
    console.log(req.params.id)
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only update your own wishlist!"));
    }
    console.log(req.body);
    let preference = await UserPreference.findOne({ userRef: req.params.id });
    console.log(preference);
    if (!preference) {
      console.log(req.params.id)
        preference = await UserPreference.create({
        ...req.body,
        userRef: req.params.id,
      });
      console.log('aa rha hai ji hai')
      return res
        .status(200)
        .json({ message: "Preference is created successfully" });
    } else {
      //update the preference
      preference = await UserPreference.findOneAndUpdate({userRef: req.params.id}, {
        $set: {
          ...req.body,
        }},
        {new: true}
      );
      return res
        .status(200)
        .json({ success: true,  preference});
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
