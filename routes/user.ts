import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import parser from "../utils/parser";
import User, { validateUser } from "../model/user";
import contact, { validateForm } from "../model/contactUs";

const router = Router();
const SECRET = "$Randon/key";

router.post("/signup", async (req: Request, res: Response) => {
  let { name, email, password, confirmPassword } = req.body;

  const errorMessage = validateUser({ name, email, password });

  if (errorMessage) {
    return res.json({ error: true, message: errorMessage });
  }

  if (password !== confirmPassword) {
    return res.json({
      error: true,
      message: "Please make sure you are entering the right passwords.",
    });
  }

  if (await User.findOne({ email })) {
    return res.json({
      error: true,
      message: "Please make sure you are using the right Email.",
    });
  }

  const salt: string = await bcrypt.genSalt(12);
  password = await bcrypt.hash(password, salt);

  User.create({ name, email, password })
    .then(() =>
      res.json({ error: false, message: "User created successfully." })
    )
    .catch((e) => res.json({ error: true, message: e.message }));
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      error: true,
      message: "Please provide the email and password!",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      error: true,
      message: "Entered information is wrong!",
    });
  }

  const token = sign({ _id: user._id }, SECRET);

  if (await bcrypt.compare(password, user.password)) {
    res
      .cookie("access_token", token)
      .json({ error: false, message: "User found", data: user._id });
  } else {
    res.json({
      error: true,
      message: "User not found. Please check the credentials.",
    });
  }
});

router.post("/contact-us", async (req: Request, res: Response) => {
  const { name, email, description } = req.body;

  const errorMessage = validateForm({ name, email, description });

  if (errorMessage) {
    return res.json({ error: true, message: errorMessage });
  }

  contact
    .create({ name, email, description })
    .then(() =>
      res.json({
        error: false,
        message: "Form submitted successfully!",
      })
    )
    .catch((e) =>
      res.json({
        error: true,
        message: "Failed due to some technical reason. Please retry!",
      })
    );
});

export default router;
