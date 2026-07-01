import { getUsers } from "../modal/userModal.js";

export const haldleUser = (req, res) => {
  console.log(getUsers());
  res.render("user", { users: getUsers() });
};

export const handleDynamicUser = (req, res) => {
  const getCamelCase = (str) => {
    console.log(str.charAt(0));
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  res.send(`<h1>${getCamelCase(req.params.name)}</h1>`);
};
