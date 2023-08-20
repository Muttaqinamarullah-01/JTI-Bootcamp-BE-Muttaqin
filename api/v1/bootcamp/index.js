const express = require("express");
const mongo = require("mongojs");
const fs = require("fs");

const todoData = JSON.parse(
  fs.readFileSync(`${__dirname}/../../../todos.json`)
);

const router = express.Router();

// const dbPass = "qsvMC7w44Z9kn0qb";
// const dbUsername = "muttaqinamarullah01";
// const db = mongo(
//   `mongodb+srv://${dbUsername}:${dbPass}@muttaqintodo.ycgtmo0.mongodb.net/CSR`,
//   ["todos"]
// );

router.get("/", function (req, res, next) {
  // let query = {};
  // if (req.query.text) query.text = req.query.text;
  // if (req.query.isCompleted) {
  //   if (req.query.isCompleted === "true") query.isCompleted = true;
  //   else query.isCompleted = false;
  // }

  // db.todos.find({}, function (err, result) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.json(result);
  //   }
  // });

  res.status(200).json({ result: todoData });
  next();
});

router.get("/:id", function (req, res, next) {
  // let query = {
  //   _id: db.ObjectId(req.params.id),
  // };

  // db.todos.findOne(query, function (err, result) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.json(result);
  //   }
  // });

  const id = req.params.id * 1;

  const todo = todoData.find((el) => el._id === id);

  res.status(200).json({ result: todo });
  next();
});

router.post("/", function (req, res, next) {
  let todo = req.body;

  if (!todo.text || !(todo.isCompleted + "")) {
    res.status(400);
    res.json({
      error: "Invalid Data",
    });
  } else {
    // db.todos.save(todo, function (err, result) {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.json(result);
    //   }
    // });

    todo._id = todoData[todoData.length - 1]._id + 1;
    todoData.push(todo);
    console.log("data inputted");

    res.status(200).json({ result: todo, status: "created" });
    next();
  }
});

router.put("/:id", function (req, res, next) {
  let todo = req.body;

  if (!todo.text || !(todo.isCompleted + "")) {
    res.status(400);
    res.json({
      error: "Invalid Data",
    });
  } else {
    let id = req.params.id * 1;
    for (let data of todoData) {
      if (data._id === id) {
        data.text = todo.text;
        data.isCompleted = todo.isCompleted;
        todo._id = id;
      }
    }

    res.status(200).json({ result: todo, status: "updated" });
    next();
  }
});

router.delete("/:id", function (req, res, next) {
  // {
  //   db.todos.remove(
  //     {
  //       _id: db.ObjectId(req.params.id),
  //     },
  //     function (err, result) {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         res.json(result);
  //       }
  //     }
  //   );
  // }
  const id = req.params.id * 1;

  const indexInJSON = todoData.findIndex((el) => el._id === id);
  let todo = todoData.find((el) => el._id === id);
  if (indexInJSON !== -1) {
    todoData.splice(indexInJSON, 1);

    res.status(200).json({ result: todo, status: "deleted" });
    next();
  } else {
    res.status(400);
    res.json({
      error: "id invalid",
    });
  }
});

module.exports = router;
