module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  HOSTNAME: process.env.HOSTNAME || "localhost",
  PORT: 3000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
