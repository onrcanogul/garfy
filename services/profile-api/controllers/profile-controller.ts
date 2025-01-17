import asyncHandler from "../helpers/asyncHelper";
import Profile from "../models/Profile";

export const get = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.body.id);
  return res.status(200).json({ success: true, result: profile });
});

export const create = asyncHandler(async (req, res) => {
  const { userId, name, surname, email, bio, avatar } = req.body;
  const profile = new Profile({
    userId: userId,
    name: name,
    surname: surname,
    email: email,
    bio: bio,
    avatar: avatar,
    rating: 0,
  });
  const createdProfile = await profile.save();
  return res.status(201).json({ success: true, result: createdProfile });
});

export const update = asyncHandler(async (req, res) => {
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({ success: true, data: updatedProfile });
});

export const remove = asyncHandler(async (req, res) => {
  const deletedJoke = await Profile.findByIdAndDelete(req.params.id);
  return res.status(200).json({ success: true, data: {} });
});
