import jwt from "jsonwebtoken";

export const signjwt = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("Error signing JWT:", error);
    return null;
  }
};

export const verifyJWT = (token) => {
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    return data;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return false;
  }
};



