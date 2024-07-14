import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.currentUser = payload;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Not authenticated" });
  }
};

export default authMiddleware;
