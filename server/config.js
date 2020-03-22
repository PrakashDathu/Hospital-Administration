require('dotenv').config();

const config = {
  mongoURL: process.env.SERVER_DB || 'mongodb+srv://i708563:T1gc6JzX2utzaFcE@cluster0-vlu1n.mongodb.net/hospitalDB?retryWrites=true&w=majority',
  port: process.env.SERVER_PORT || 3030,
  env: process.env.NODE_ENV || 'dev',
  jwt_secret: process.env.JWT_SECRET || 'JustDoIt',
};

export default config;