const express = require("express");
const router = express.Router();

/**
 *  '/user/'
 */

router.post("/auth", (req, res) => {
  if (req.user) {
    const { password, ...publicUser } = req.user;
    res.json(publicUser);
  } else {
    res.status(400).send();
  }
});

router.post("/ping", (req, res) => {
  res.json(`pong`);
});


module.exports = router;
