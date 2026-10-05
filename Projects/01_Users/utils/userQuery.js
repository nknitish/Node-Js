export const buildUserFilter = ({ name, email }) => {
  const filter = {};

  if (name) {
    filter.name = {
      $regex: `^${escapeRegex(name.trim())}`,
      $options: "i",
    };
  }

  if (email) {
    filter.email = {
      $regex: `^${escapeRegex(email.trim())}`,
      $options: "i",
    };
  }

  return filter;
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
