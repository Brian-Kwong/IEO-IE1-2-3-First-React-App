//backend.js
import express from "express";
import cors from "cors";
import { addUser, getUsers, findUserById, deleteUser } from "./user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  getUsers(name, job)
    .then((users) => {
      users = { users_list: users };
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(404).send("Invalid request.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  if (id === undefined) {
    res.status(400).send("Invalid request.");
  } else {
    findUserById(id)
      .then((user) => {
        res.send(user);
      })
      .catch(() => {
        res.status(404).send("Resource not found.");
      });
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch(() => {
      res.status(400).send("Invalid user.");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  if (id === undefined) {
    res.status(400).send("Invalid request.");
  } else {
    deleteUser(id)
      .then(() => {
        res.status(204).send();
      })
      .catch(() => {
        res.status(404).send("Resource not found.");
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
