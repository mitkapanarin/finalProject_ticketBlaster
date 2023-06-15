const express = require("express");
const event = require("./handlers/eventsHandler");
const db = require("../../pkg/db/index");
const jwt = require("express-jwt");
const cors = require("cors");
const api = express();

api.use(express.json());
api.use(cors());
db.init();
//ako sakame da imame nesto sto ne e protektirano go pisuvame pred middlwere. Primer: 
// api.get("/api/v1/posts/console1", (req, res) => {
//   console.log("This is service1");
//   res.send("this is service1");
// });

api.use(
  jwt.expressjwt({
    algorithms: ["HS256"],  // 
    secret: process.env.JWT_SECRET,  //midllwere za avtomatsko protektiranje na site ruti, za toa go imame instalirano express-jwt so algoritam hs256
  })
);

api.get("/api/v1/events", event.getAll);
api.get("/api/v1/events/:id", event.getOne);
api.post("/api/v1/events", event.create);
api.patch("/api/v1/events/:id", event.update);
api.delete("/api/v1/events/:id", event.delete);

api.listen(process.env.PORTEVENT, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log(" service started successfully on port 7001");
});
