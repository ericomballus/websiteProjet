const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, "prcSecret", { expiresIn: "180s" }, (err, token) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
