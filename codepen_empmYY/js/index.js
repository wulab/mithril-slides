(function() {
  var Todo, VM, todo,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  todo = {};

  Todo = (function() {
    function Todo(data) {
      this.description = m.prop(data.description);
      this.done = m.prop(false);
    }

    return Todo;

  })();

  todo.Todo = Todo;

  todo.TodoList = Array;

  VM = (function() {
    function VM() {
      this.add = __bind(this.add, this);
      var d, _i, _len, _ref;
      this.list = new todo.TodoList;
      _ref = ["Design ui", "Write code"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        this.list.push(new todo.Todo({
          description: d
        }));
      }
      this.description = m.prop("");
    }

    VM.prototype.add = function() {
      if (this.description()) {
        this.list.push(new todo.Todo({
          description: this.description()
        }));
        return this.description("");
      }
    };

    return VM;

  })();

  todo.VM = VM;

  todo.controller = function() {
    return todo.vm = new todo.VM;
  };

  todo.view = function() {
    return m("div.container", [
      m("h1.page-header", "A Todo Application"), m("form[role=form]", [
        m("div.input-group", [
          m("input[type=text].form-control", {
            onchange: m.withAttr("value", todo.vm.description),
            value: todo.vm.description()
          }), m("span.input-group-btn", [
            m("button[type=button].btn.btn-default", {
              onclick: todo.vm.add
            }, "Add")
          ])
        ]), todo.vm.list.map(function(task, index) {
          return m("div.checkbox", [
            m("label", [
              m("input[type=checkbox]", {
                onclick: m.withAttr("checked", task.done),
                checked: task.done()
              }), m("span", {
                style: {
                  textDecoration: task.done() ? "line-through" : "none"
                }
              }, task.description())
            ])
          ]);
        })
      ])
    ]);
  };

  m.module(document.body, {
    controller: todo.controller,
    view: todo.view
  });

}).call(this);
