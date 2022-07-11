const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Timezone = require("../model/timezones");
const jwt = require("jsonwebtoken");
const checkAuthentication = require("./checkAuthentication");

router.post("/signUp", (req, res, next) => {
  const user = new User({
    emailId: req.body.emailId,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role || 0,
    timeZone: [],
  });

  User.findOne({ emailId: req.body.emailId })
    .then((userData) => {
      if (userData) {
        return res.status(401).json({
          message: "User is Already Exit",
        });
      }
      user.save().then((data) => {
        const { emailId } = data;
        if (!data) {
          return res.status(500).json({
            message: "Error while creating User",
          });
        }
        res.status(200).json({
          message: "User Created",
          data: { emailId },
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/getAllUsers", checkAuthentication, (req, res, next) => {
  User.findOne({ emailId: req.emailId })
    .then((userData) => {
      if (userData.role === 0) {
        return res.status(401).json({
          message: "User is not Authorized",
        });
      }
      User.find({ role: 0 }).then((data) => {
        res.status(200).json({
          userData: data,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/signIn", (req, res, next) => {
  User.findOne({ emailId: req.body.emailId })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({
          message: "User does not exists",
        });
      }
      if (userData.password !== req.body.password) {
        return res.status(401).json({
          message: "Incorrect Password",
        });
      }
      const token = jwt.sign(
        {
          emailId: userData.emailId,
        },
        "Expire in 1 Hour",
        { expiresIn: "1h" }
      );
      const user = {
        emailId: userData.emailId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        timeZone: userData.timeZone,
        role: userData.role,
        token,
        expiresIn: 3600,
      };
      req.currentUser = user;
      return res.status(200).json({
        user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getTimeZone", (req, res, next) => {
  User.findOne({ emailId: req.query.emailId })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({
          message: "User does not exists",
        });
      }

      return res.status(200).json({
        user: {
          emailId: userData.emailId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          timeZone: userData.timeZone,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addTimeZone", (req, res, next) => {
  User.findOne({ emailId: req.body.emailId })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({
          message: "User does not exists",
        });
      }

      userData.timeZone.push(req.body.timeZone);
      userData.save().then((data) => {
        res.status(200).json(userData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/editTimezone", checkAuthentication, (req, res, next) => {
  User.findOne({ emailId: req.body.emailId })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({
          message: "User does not exists",
        });
      }

      const timezoneArray = userData.timeZone.map((zone) => {
        if(zone._id.toString() === req.body._id.toString()) {
          zone.name = req.body.name;
          zone.timeZone = req.body.timeZone;
          return zone;
        } else {
          return zone;
        }
      });
      userData.timezone = timezoneArray;
      userData.save().then((data) => {
        res.status(200).json(userData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteTimezone", checkAuthentication, (req, res, next) => {
  if (req.emailId !== req.body.emailId) {
    User.findOne({ emailId: req.emailId }).then((user) => {
      if (user.role !== 2) {
        return res.status(401).json({
          message: "You are not authorized to delete this record",
        });
      }
    });
  }

  User.findOne({ emailId: req.body.emailId })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({
          message: "User does not exists",
        });
      }
      const userTimezone = userData.timeZone.filter(
        (zone) => zone._id.toString() !== req.body._id.toString()
      );
      userData.timeZone = userTimezone;
      userData.save().then((data) => {
        res.status(200).json(userData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deleteUser", (req, res, next) => {
  User.findOneAndDelete({ emailId: req.body.emailId })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({
          message: "User does not exists",
        });
      }
      User.find({ role: 0 }).then((data) => {
        res.status(200).json({
          userData: data,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
