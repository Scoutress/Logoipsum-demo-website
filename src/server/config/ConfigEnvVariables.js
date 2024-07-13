import "dotenv/config";

const { SERVER_PORT, DB_CONNECTION, TOKEN_SECRET, TOKEN_EXPIRATION } =
  process.env;

const missingParams = [];

if (!SERVER_PORT) {
  missingParams.push("SERVER_PORT");
}

if (!DB_CONNECTION) {
  missingParams.push("DB_CONNECTION");
}

if (!TOKEN_SECRET) {
  missingParams.push("TOKEN_SECRET");
}

if (!TOKEN_EXPIRATION) {
  missingParams.push("TOKEN_EXPIRATION");
}

if (missingParams.length > 0) {
  throw new Error(`Missing environment variables: ${missingParams.join(", ")}`);
}

export default {
  SERVER_PORT,
  DB_CONNECTION,
  TOKEN_SECRET,
  TOKEN_EXPIRATION,
};
