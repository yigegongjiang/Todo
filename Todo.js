var mongodb = require('./mongodb.js');
var Schema = mongodb.mongoose.Schema;
var TodoSchema = new Schema({
    content: String,
    show: Boolean
});
var TodoModel = mongodb.mongoose.model("Todo", TodoSchema);

function Todo(content, show) {
  this.content = content;
  this.show = show;
};

Todo.prototype.save = function(todo, callback) {
  var todo = {
      content: todo.content,
      show: todo.show
  };

  var newTodo = new TodoModel(todo);

  newTodo.save(function (err, todo) {
    if (err) {
      return callback(err);
    }
    callback(null, todo);
  });
};

Todo.prototype.get = function(callback) {
  TodoModel.find({'show':true}, function (err, todos) {
    if (err) {
      return callback(err);
    }
    callback(null, todos);
  });
};

Todo.prototype.getAll = function(callback) {
  var wherestr ={};
  var opt = {content:true, _id:false, show:true, __v:false };
  var query = TodoModel.find({}).select('content -_id').sort({_id :-1});
  query.exec(function (err, todos) {
    if (err) {
      return callback(err);
    }
    callback(null, todos);
  });

  // TodoModel.find({},opt,function (err, todos) {
  //   if (err) {
  //     return callback(err);
  //   }
  //   callback(null, todos);
  // });
};



Todo.prototype.delete = function(id, callback) {
    TodoModel.update({'_id':id}, {'show':false}, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
};

module.exports = Todo;
