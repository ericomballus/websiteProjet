module.exports = async (req, res, next) => {
  //console.log(req);
  console.log("hostname===>", req.hostname);
  console.log("originaleUrl===>", req.originalUrl);
  console.log("ip===>", req.ip);
  next();
};
