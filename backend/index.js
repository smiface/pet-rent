const express = require("express");
const path = require("path");
const fs = require("fs");
const { db } = require("./db");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const { pickRouter, authRouter , paymentRouter} = require("./routes");
// const categoriesRouter = require('./routes/categories');

const PORT = process.env.PORT || 8888;
// const server = require("http").Server(app);
// const useSocket = require("socket.io");
// const io = useSocket(server, { cors: { origin: "*" } });
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(cookieParser());

app.use("*", (req, res, next) => {
  const token = req.cookies.session_token;

  if (token) {
    const user = db.usersData[token];
    req.token = token;
    req.user = user;
  }

  next();
});

app.use("/static/*", (req, res, next) => {
  if (!req.user) return res.status(401).send();
  next();
});

app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/user", authRouter);
app.use("/pick", pickRouter);
app.use("/card", paymentRouter);
// require("./auth/auth")(app);

const getPageList = (str, page_number, page_size = 7) => {
  // const arr = db['rouletteWins' + val]

  return {
    arr: db[str].slice((page_number - 1) * page_size, page_number * page_size),
    pages: Math.trunc(db[str].length / page_size) + 1,
  };
};

// app.post("/cities", (req, res) => {
//   const tokenByReq = db.activeAuthTokens.find((token) => token.token === req.body.token) || false;
//   tokenByReq ? res.status(200).send(db.cities) : res.send(400);
// });

// app.post("/categories", (req, res) => {
//   const tokenByReq = db.activeAuthTokens.find((token) => token.token === req.body.token) || false;
//   if (tokenByReq) {
//     res.send(200);
//   } else {
//     res.send(400);
//   }
// });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
