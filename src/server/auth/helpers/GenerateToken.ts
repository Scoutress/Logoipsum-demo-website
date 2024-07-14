import jwt from "jsonwebtoken";
import configEnvVariables from "../../config/ConfigEnvVariables.js";

const { TOKEN_SECRET, TOKEN_EXPIRATION } = configEnvVariables;

const generateToken = (payload) => {
  const token = jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
  return token;
};

export default generateToken;
