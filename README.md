# Todo - Persistence

### Persistence In 3 Easy (?) Steps

Refer to [the finished codealong](https://github.com/ci-wdi-900/random-name-generator-solution) if you get lost in the details!

1. Read the todos in.
    * at the bottom of the file, read the JSON file with `fs.readFile`. You'll find the path to the file in the `PATH_TO_TODOS_FILE` variable. You'll pass in the path to the file as well as a callback function.
    * In that function, populate your `todos` array with the `todos` key on the object you get when you parse the JSON data.
    * Then run your `displayTodos` function. (Before now, you don't have any todos!)

2. Define a `saveTodos` function. It will:
    * Make an object whose key is our todos array
    * Stringify that object into JSON.
    * Run `fs.writeFile`, passing in the same path as well as our stringified object, the string `utf8`, and a callback function. The callback should:
        * deal with any errors
        * `console.log` out that the changes have been saved
        * Run `displayTodos` (**you might have to move any `console.clear`s around to make sure that you don't clear your changes-have-been-saved message!**)

3. Add a call to `saveTodos` any place where you make a change to your `todos` array.


### Stretch Goals

Coming soon!
