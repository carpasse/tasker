# Tasker

Task runner pet project

# Task
A task can be a command, a string, or a function or a list of the previously defined tasks.

## Command task
Typically used to create side effects. like `yarn build` or `git push`.

## function
A plain old JS function. It will be called with 2 parameters. The result of the previous task and a shared options object.

## string
Can be a module name that resolves to a function. Or a task defined in the config.

## task list
A task list gets defined in *tasker's* config file and it is an array of the previously defined task. A task list can even contain other named task lists.

