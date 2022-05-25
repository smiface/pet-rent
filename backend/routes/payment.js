const express = require("express");
const router = express.Router();
const { db } = require("../db");
const fs = require("fs");

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const saveUsersData = (cb) => {
  fs.writeFile("./db/usersData.json", JSON.stringify(db.usersData), function (err) {
    if (err) {
      return console.log(err);
    }
    cb();
  });
};

router.post("/add", (req, res) => {
  const canAddCard = req.user ? !req.user.cards.find((card) => card.number === req.body.number) : false;

  if (canAddCard) {
    addDate = Date.now();
    db.usersData[req.token].cards.push({ number: req.body.number, cvv: req.body.cvv, addDate: addDate });
    saveUsersData(res.json(addDate));
  } else {
    res.status(400);
  }
});

router.post("/remove", (req, res) => {
  const canRemoveCard = req.user ? req.user.cards.find((card) => card.number === req.body.number) : false;

  if (canRemoveCard) {
    db.usersData[req.token].cards = req.user.cards.filter((card) => card.number == req.body.number);
    saveUsersData(res.json("card removed"));
  } else {
    res.status(400);
  }
});

router.post("/require_code", (req, res) => {
  // pushId ( Date.now()), cardNumber, pushCode, status
  const newPayData = { id:  Date.now().toString(), cardNumber: req.body.number, pushCode: randomInteger(100, 999) };
  req.user.pays[newPayData.id] = { cardNumber: newPayData.cardNumber, pushCode: newPayData.pushCode, status: "waiting" };
  saveUsersData(() => res.json({ id: newPayData.id, pushCode: newPayData.pushCode }));
});

router.post("/pay", (req, res) => {
  //  token: token, cardId: this.Root.cars.currentCar.id, pushId: this.pushId, pushCode: this.code
  const isCodeRight = req.user.pays[req.body.pushId].pushCode === req.body.pushCode;

  if (isCodeRight) {
    req.user.pays[req.body.pushId].status = "done";
    req.user.rents.push({ cardId: req.body.cardId, city: db.cars[req.body.cardId].city, pushId: req.body.pushId });
    saveUsersData(() => res.json("ok"));
  } else {
    res.status(400);
  }

  res.json("ok");
});

module.exports = router;
