var express = require('express');
var Todo = require("../models/Todo.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var todo = new Todo();
  todo.get(function(err, todoBack){
    res.render('index', { allContent: todoBack.reverse() }); 
  });
});

router.get('/add', function(req, res) {
  var content = req.query.content;
  var todo = new Todo(content, true);
  todo.save(todo, function(err, todoBack){
    if (err) {
        res.writeHead(500);
    } else {
        res.writeHead(200);
    }
    res.write(todoBack.id);
    res.end();
  });
});

router.get('/delete', function(req, res) {
    var id = req.query.id;
    var todo = new Todo();
    todo.delete(id, function(err){
      if (err) {
          res.writeHead(500);
      } else {
          res.writeHead(200);
      }
      res.end();
    });
});

router.get('/all', function(req, res) {
  var todo = new Todo();
  todo.getAll(function(err, todoBack){
    res.render('all', { allContent: todoBack.reverse() }); 
  });
});

module.exports = router;
