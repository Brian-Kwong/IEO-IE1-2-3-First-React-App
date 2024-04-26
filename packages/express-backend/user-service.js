import mongoose from "mongoose";
import userModel from "./user.js";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}.lsc4jwh.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0/users`;

mongoose.set("debug", true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

export const getUsers = function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else {
    promise = findUserByNameAndJob(name, job);
  }
  return promise;
};

export const findUserById = function findUserById(id) {
  return userModel.findById(id);
};

export const deleteUser = function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
};

export const addUser = function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
};

function findUserByNameAndJob(name) {
  return userModel.find({ name: name, job: job });
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}
