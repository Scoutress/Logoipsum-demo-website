import jwt, { SignOptions } from "jsonwebtoken";
import configEnvVariables from "../../config/ConfigEnvVariables.ts";

const { TOKEN_SECRET, TOKEN_EXPIRATION } = configEnvVariables;

if (!TOKEN_SECRET) {
  throw new Error("TOKEN_SECRET is not defined in the environment variables.");
}

interface Payload {
  [key: string]: any;
}

const generateToken = (payload: Payload): string => {
  const options: SignOptions = {
    expiresIn: TOKEN_EXPIRATION,
  };
  return jwt.sign(payload, TOKEN_SECRET, options);
};

export default generateToken;
