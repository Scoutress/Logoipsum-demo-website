import "dotenv/config";

const requiredParams: { [key: string]: string | undefined } = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_CONNECTION: process.env.DB_CONNECTION,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
};

const missingParams: string[] = [];

for (const [key, value] of Object.entries(requiredParams)) {
  if (!value) {
    missingParams.push(key);
  }
}

if (missingParams.length > 0) {
  throw new Error(`Missing environment variables: ${missingParams.join(", ")}`);
}

export default {
  SERVER_PORT: requiredParams.SERVER_PORT,
  DB_CONNECTION: requiredParams.DB_CONNECTION,
  TOKEN_SECRET: requiredParams.TOKEN_SECRET,
  TOKEN_EXPIRATION: requiredParams.TOKEN_EXPIRATION,
};
