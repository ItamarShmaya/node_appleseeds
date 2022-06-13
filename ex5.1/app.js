import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createUser, readUser, updateUser, deleteUser } from "./users.js";

yargs(hideBin(process.argv))
  .command(
    "create",
    "Create a user",
    {
      name: {
        describe: "User name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: true,
        type: "string",
      },
      password: {
        describe: "password",
        demandOption: true,
        type: "string",
      },
    },
    function (argv) {
      createUser(argv.name, argv.email, argv.password);
    }
  )
  .command(
    "read",
    "Read a user",
    {
      id: {
        describe: "User's id",
        demandOption: true,
        type: "string",
      },
    },
    function (argv) {
      readUser(argv.id);
    }
  )
  .command(
    "update",
    "Update a user",
    {
      id: {
        describe: "User's id",
        demandOption: true,
        type: "string",
      },
      name: {
        describe: "User's name",
        type: "string",
      },
      email: {
        describe: "User's email",
        type: "string",
      },
      password: {
        describe: "User's password",
        type: "string",
      },
    },
    function (argv) {
      updateUser(argv.id, argv.name, argv.email, argv.password);
    }
  )
  .command(
    "delete",
    "Delete a user",
    {
      id: {
        describe: "User's id",
        demandOption: true,
        type: "string",
      },
    },
    function (argv) {
      deleteUser(argv.id);
    }
  )
  .demandCommand(1)
  .parse();
