const router = require("express").Router();
const { User } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;
    const confirmPassword = req.body.confirmPassword;
    const regex = "^[a-z][a-z0-9_.]{1,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$";

    const checkuser = await User.findOne({
      raw: true,
      where: { email: req.body.email },
    });

    if (checkuser) {
      return res.status(300).json("Email is already registed");
    }
    if (!email.match(regex)) {
      return res.status(301).json("Email is not valid");
    }
    if (!confirmPassword.match(req.body.password)) {
      return res.status(302).json("Password not match");
    }
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth: req.body.birth,
      address: req.body.address,
      phone: req.body.phone,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      raw: true,
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(402).json("Invalid user ");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(403).json({ msg: "Invalid password" });
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "360000s",
    });
    res.status(250).json({ token: accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get user info
router.get("/user", async (req, res) => {
  try {
    const userDecode = authenToken(process.env.ACCESS_TOKEN_SECRET, req);
    if (!userDecode) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    res.status(200).json({
      status: "success",
      user: userDecode,
    });
    // res.send()
  } catch (error) {
    res.status(401).json(error);
  }
});

//Get all users
router.get("/", async (req, res) => {
  const users = await User.findAll({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Generate token
function authenToken(key, req) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  const payload = verifyToken(token, key);
  return payload;
}

// Verify token
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

// Get user by id

router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    attributes: ["email"],
    where: { id: req.params.id },
  });
  try {
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
