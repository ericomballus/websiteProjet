const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log(req.headers);
  // console.log(`The client's IP Address is: ${req.socket.remoteAddress}`);
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "prcSecret", (err, data) => {
      if (data) {
        next();
      } else {
        return res.status(401).json(`Votre Session a expirée!`);
      }
    });
    /// ;
  } else {
    console.log("no token");
    next();
  }
};
