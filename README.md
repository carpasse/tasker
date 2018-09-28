# Tasker

Task runner pet project


## Compiling and Testing
We use [nvm](https://github.com/creationix/nvm) to decide which of node to use and [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) together with [lerna](https://github.com/lerna/lerna) to manage the mono repo.

So after you clone the repo you just need to run
```
$ nvm use
```
to install the supported node version, then run [`yarn`](https://yarnpkg.com/lang/en/docs/cli/#toc-default-command)'s default command
```
$ yarn
```
to install and build the packages and finally you can run
```
$ yarn test
```
to run the tests.

## Discussion

Please open an issue if you have any questions or concerns.

## License
[MIT License](https://opensource.org/licenses/MIT)