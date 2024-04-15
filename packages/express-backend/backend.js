//backend.js
import express from "express";

//db
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const app = express();
const port = 8000;

const checkIfValidUser = (user) => {
  if (
    user["name"] &&
    typeof user["name"] == "string" &&
    user["job"] &&
    typeof user["job"] == "string" &&
    user["id"] &&
    typeof user["id"] == "string" &&
    !users["users_list"].includes(user["id"])
  ) {
    return true;
  }
  return false;
};

const addUser = (user) => {
  console.log(user);
  if (!checkIfValidUser(user)) {
    return null;
  }
  users["users_list"].push(user);
  return user;
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job);
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined || job != undefined) {
    let result = null;
    if (name != undefined && job != undefined) {
      result = findUserByNameAndJob(name, job);
    } else if (name != undefined) {
      result = findUserByName(name);
    } else {
      result = findUserByJob(job);
    }
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (addUser(userToAdd) === null) {
    res.status(400).send("Invalid user.");
  } else {
    res.send();
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  if (id === undefined) {
    res.status(400).send("Invalid request.");
  }
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    delete users["users_list"][users["users_list"].indexOf(result)];
    res.send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
