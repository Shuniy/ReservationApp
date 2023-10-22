import prisma from "@/helpers/PrismaHelper";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password }: { email: string; password: string } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      { valid: validator.isEmail(email), errorMessage: "Email is invalid" },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Password is invalid",
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Email or password is Invalid!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Email or password is Invalid!" });
    }

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: email })
      .setProtectedHeader({ alg })
      .setExpirationTime("48h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 48 });
    return res.status(200).json({
      token,
    });
  }
  return res.status(404).json("Unknown endpoint");
}
