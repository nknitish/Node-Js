export const buildUserFilter = ({ name, email }) => {
  let filter = {};
  if (name) {
    filter.name = {
      $regex: name.trim(),
      $options: "i",
    };
  }

  if (email) {
    filter.email = {
      $regex: email.trim(),
      $options: "i",
    };
  }

  return filter;
};
