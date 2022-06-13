import chalk from "chalk";
import fs from "fs";
import uniqid from "uniqid";

const PATH = "./users.json";

const getUsers = () => {
  try {
    const users = fs.readFileSync(PATH, "utf-8");
    return JSON.parse(users);
  } catch (e) {
    return [];
  }
};

const saveUsers = (users) => {
  const usersJSON = JSON.stringify(users);
  fs.writeFileSync(PATH, usersJSON);
};

export const createUser = (name, email, password) => {
  const users = getUsers();
  const user = users.find(
    (user) =>
      user.name.toLowerCase() === name.toLowerCase() ||
      user.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) {
    users.push({
      name,
      email,
      password,
      id: uniqid.process(),
    });
    saveUsers(users);
    console.log(chalk.green.inverse("User created"));
  } else {
    console.log(chalk.red.inverse("username or email already taken"));
  }
};

export const readUser = (id) => {
  const users = getUsers();
  const user = users.find((user) => user.id === id);
  if (user) {
    console.log(chalk.blue("User:"));
    console.log(user);
  } else {
    console.log(chalk.red.inverse("User not found"));
  }
};

export const updateUser = (id, name, email, password) => {
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    console.log(chalk.red.inverse("User not found"));
    return;
  } else {
    if (name && name !== "") users[userIndex].name = name;
    if (email && email !== "") users[userIndex].email = email;
    if (password && password !== "") users[userIndex].password = password;

    saveUsers(users);
    console.log(chalk.green.inverse("User updated"));
    console.log(users[userIndex]);
  }
};

export const deleteUser = (id) => {
  const users = getUsers();
  const updatedUserList = users.filter((user) => user.id !== id);
  if (users.length === updatedUserList.length) {
    console.log(chalk.red.inverse("User doesn't exist"));
    return;
  } else {
    saveUsers(updatedUserList);
    console.log(chalk.green.inverse("User deleted"));
  }
};
