import asyncHandler from "../helpers/asyncHelper";
import Pet from "../models/Pet";

export const getByProfile = asyncHandler(async (req, res) => {
  const usersPets = await Pet.find({ profileId: req.params.profileId });
  return res.status(200).json({ success: true, result: usersPets });
});

export const create = asyncHandler(async (req, res) => {
  const { age, name, species, profileId } = req.body;
  const pet = new Pet({
    age: age,
    name: name,
    species: species,
    profileId: profileId,
  });
  const createdPet = await pet.save();
  return res.status(201).json({ success: true, result: createdPet });
});

export const update = asyncHandler(async (req, res) => {
  const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({ success: true, result: updatedPet });
});

export const remove = asyncHandler(async (req, res) => {
  const deletedPet = await Pet.findByIdAndDelete(req.params.id);
  return res.status(200).json({ success: true, result: {} });
});
