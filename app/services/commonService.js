import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    user.email
      ? {
          id: user.id,
          email: user.email,
          roles: user.roles || null,
        }
      : {
          id: user.id,
          phoneNumber: user.phoneNumber,
          roles: user.roles || null,
        },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign({ id: user.id }, env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const setCookieAccessRefreshToken = (res, verifiedTokens) => {
  const { accessToken, refreshToken } = verifiedTokens;
  const cookieOption = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 1000,
  };

  if (!env.isProd) {
    cookieOption.domain = "uddoktahut.local";
  } else {
    cookieOption.domain = "uddoktahut.com";
  }

  res.cookie("accessToken", accessToken, cookieOption);

  res.cookie("refreshToken", refreshToken, cookieOption);
};

export { generateTokens, setCookieAccessRefreshToken };
