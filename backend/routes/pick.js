const express = require("express");
const router = express.Router();
const { db } = require("../db");
/**
 *  '/pick/'
 */

router.get("/categories", (req, res) => {
  res.json(db.categories);
});

router.get("/cars:city", (req, res) => {
  const filterByCity = (cars, city) => Object.values(cars).filter((el) => el.city.toLowerCase() == city.substring(1).toLowerCase());

  const publicCar = car => {
    const {about, ...pubCar} = car;
    return pubCar
  }
  const carsInCity = filterByCity(db.cars, req.params.city).map(publicCar);
  res.json(carsInCity);
});

router.get("/car:id", (req, res) => {
  const car = db.cars[req.params.id.substring(1)]

  if (car){
    return res.json(car)
  } else {
    res.status(401).send()
  }
});

router.get("/cities", (req, res) => {
  res.json(db.cities)
});

module.exports = router;
