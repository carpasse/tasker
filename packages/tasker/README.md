# Tasker

Task runner pet project

# Task
A task can be a command or a simple function module.

## Command task
Typically used to create side effects. like `yarn build` or `git push`.

## function
A plain old JS function it will receive an options object as the first argument with all the args the the task was run with and as a second parameter it will receive the output of the previous task in the list or undefined if there was no outcome or it was the first task in the task list.

## registered task name
A string that must match a module in node modules that will resolve with a function or a task list.

## Task list
An array of tasks. Each item of the array is a step which can be a task or another task list.