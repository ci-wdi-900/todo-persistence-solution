const readline = require('readline');
const fs = require('fs');


const PATH_TO_TODOS_FILE = __dirname + '/../back-end/todos.json';
let todos = [];
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const saveTodos = function() {
  // make a data object with our updated todos array as its todos property
  const data = {
    todos: todos,
  };

  // make that object into a JSON string
  const newContents = JSON.stringify(data, null, 2);

  // write that JSON string into the file
  fs.writeFile(PATH_TO_TODOS_FILE, newContents, 'utf8', (err) => {
    if (err) {
      throw error;
    }

    console.log('\n\nYour changes have been saved! What do you want to do next?\n')
  });
}

const displayMenu = function() {
  const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Remove all completed todos.
4. Toggle a todo's completion status.
5. Toggle a todo's priority.

Type "q" or "quit" to quit.

`

  interface.question(menu, handleMenu);
}

const displayTodos = function() {
  console.clear();
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    console.log(i + 1 + '. ' + todos[i].text + ' ' + '- priority: ' + todos[i].priority + ' - ' + (todos[i].isComplete ? '✅' : '✖'));
    // or, with interpolation:
    // console.log(`${i + 1}. ${todos[i].text} - priority: ${todos[i].priority} - ${todos[i].isComplete ? '✅' : '✖'}`);
  }
}

const add = function(answer) {
  const todo = {
    text: answer,
    priority: 2,
    isComplete: false,
  }

  todos.unshift(todo);
  saveTodos();
  displayTodos();
  displayMenu();
}

const remove = function(num) {
  todos.splice(num - 1, 1);
  saveTodos();
  displayTodos();
  displayMenu();
}

const toggleComplete = function(num) {
  const todo = todos[num - 1];
  todo.isComplete = !todo.isComplete;

  saveTodos();
  displayTodos();
  displayMenu();
}

const togglePriority = function(num) {
  const todo = todos[num - 1];
  if (todo.priority === 1) {
    todo.priority = 2;
  } else if (todo.priority === 2) {
    todo.priority = 1;
  }

  saveTodos();
  displayTodos();
  displayMenu();
}

const removeCompletedTodos = function() {
  todos = todos.filter(function(todo) {
    return todo.isComplete === false;
  })

  saveTodos();
  displayTodos();
  displayMenu();
}

// or with a nifty one-line arrow function
const removeCompletedTodosAlt = function() {
  todos = todos.filter((todo) => todo.isComplete === false);

  saveTodos();
  displayTodos();
  displayMenu();
}


const handleMenu = function(cmd) {
  if (cmd === '1') {
    interface.question('\nWhat should go on your list? ', add)
  } else if (cmd === '2') {
    displayTodos();
    interface.question('\nPlease pick a todo to remove: ', remove)
  } else if (cmd === '3') {
    removeCompletedTodos();
  } else if (cmd === '4') {
    displayTodos();
    interface.question('\nPlease pick a todo to check complete or incomplete: ', toggleComplete)
  } else if (cmd === '5') {
    displayTodos();
    interface.question('\nPlease pick a todo to toggle its priority: ', togglePriority)
  } else if (cmd === 'q' || cmd === 'quit'){
    console.log('Quitting!');
    interface.close();
  } else {
    displayTodos();
    displayMenu();
  }
}


fs.readFile(PATH_TO_TODOS_FILE, (err, data) => {
  const obj = JSON.parse(data);
  todos = obj.todos;
  displayTodos();
  displayMenu();
});
