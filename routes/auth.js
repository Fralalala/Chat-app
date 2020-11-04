const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require('../middleware/auth')

//this is needed. because this is used as a 2nd parameter in the request, in this case the post req
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const router = express.Router();

//@route    GET api/auth
//@desc     Get get logged in user
//@access   Private
router.get("/",auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
  } catch (error) {
      console.error(error.message)
      res.status(500).send('server error')
  }
});

//@route    POST api/auth
//@desc     Auth user & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "pass is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: "invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "Wroongpassword foo lala",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
        console.error(errror.message)
        res.status(500).send("server error lala")
    }
  }
);

module.exports = router;
