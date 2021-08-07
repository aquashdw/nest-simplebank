# Shared Objects
Contains definitions of DTOs, Jobs and Event messages. First build the project,
```shell
$ npm run build
```
then it can be used in other services (in this project) with
```shell
$ npm install ../shared
```

when shared objects are updated, use
```shell
$ npm uninstall @simplebank/shared-objects
```
to remove the package, the re-install using the same command.
```shell
$ npm install ../shared
```
TODO find a better way to do this