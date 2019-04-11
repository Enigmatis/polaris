# [2.8.0](https://github.com/Enigmatis/polaris/compare/v2.7.0...v2.8.0) (2019-04-10)


### Bug Fixes

* **filter:** filter executor now supports non array object result ([f928c40](https://github.com/Enigmatis/polaris/commit/f928c40))
* **server:** get app in start function also in interface ([ab6d63c](https://github.com/Enigmatis/polaris/commit/ab6d63c))


### Features

* **server:** server.start is async so user can await untill the start ([84883f2](https://github.com/Enigmatis/polaris/commit/84883f2))

# [2.7.0](https://github.com/Enigmatis/polaris/compare/v2.6.0...v2.7.0) (2019-04-09)


### Features

* **headers:** invalid error returning graphql error to the user ([2436733](https://github.com/Enigmatis/polaris/commit/2436733)), closes [#44](https://github.com/Enigmatis/polaris/issues/44)
* **schema:** allow to use gql schema instead of regular string ([407211b](https://github.com/Enigmatis/polaris/commit/407211b))

# [2.6.0](https://github.com/Enigmatis/polaris/compare/v2.5.0...v2.6.0) (2019-04-04)


### Bug Fixes

* added tests ([296c570](https://github.com/Enigmatis/polaris/commit/296c570))
* after code review ([2d37817](https://github.com/Enigmatis/polaris/commit/2d37817))
* after sakak ([48fabec](https://github.com/Enigmatis/polaris/commit/48fabec))
* fix sakak and make irrelevant disappear if no data version provided ([0c66b98](https://github.com/Enigmatis/polaris/commit/0c66b98))
* merge with master ([040656f](https://github.com/Enigmatis/polaris/commit/040656f))


### Features

* added irrelevant entities container ([cacf6bc](https://github.com/Enigmatis/polaris/commit/cacf6bc))
* merge with vladi + irr works ([609a2a5](https://github.com/Enigmatis/polaris/commit/609a2a5))
* refactoring code location (query irr) ([5b7fd87](https://github.com/Enigmatis/polaris/commit/5b7fd87))
* working meanwhile ([6ccb82e](https://github.com/Enigmatis/polaris/commit/6ccb82e))
* working meanwhile ([d4dca62](https://github.com/Enigmatis/polaris/commit/d4dca62))
* **irrelevant entities:** multiple irrelevant entities for queries ([c7af32e](https://github.com/Enigmatis/polaris/commit/c7af32e))
* **irrelevant entities:** multiple irrelevant entities for queries ([848f3a3](https://github.com/Enigmatis/polaris/commit/848f3a3))

# [2.5.0](https://github.com/Enigmatis/polaris/compare/v2.4.0...v2.5.0) (2019-04-02)


### Bug Fixes

* updated packages ([045713e](https://github.com/Enigmatis/polaris/commit/045713e))
* updated packages ([20d55d1](https://github.com/Enigmatis/polaris/commit/20d55d1))


### Features

* **schema:** the repository is now providing the whole executable ([c53d9bc](https://github.com/Enigmatis/polaris/commit/c53d9bc))

# [2.4.0](https://github.com/Enigmatis/polaris/compare/v2.3.0...v2.4.0) (2019-04-01)


### Features

* **koa server:** allow to pass custom koa server to the apollo ([27c9229](https://github.com/Enigmatis/polaris/commit/27c9229))
* **koa server:** allow to pass custom koa server to the apollo ([9f4c903](https://github.com/Enigmatis/polaris/commit/9f4c903))

# [2.3.0](https://github.com/Enigmatis/polaris/compare/v2.2.1...v2.3.0) (2019-03-26)


### Features

* **mongo-driver:** support new mongo driver ([09ca797](https://github.com/Enigmatis/polaris/commit/09ca797))
* **mongo-driver:** support new mongo driver ([8795c22](https://github.com/Enigmatis/polaris/commit/8795c22))
* **subscription:** support subscription ([3a9d5d7](https://github.com/Enigmatis/polaris/commit/3a9d5d7))

## [2.2.1](https://github.com/Enigmatis/polaris/compare/v2.2.0...v2.2.1) (2019-03-05)


### Bug Fixes

* **fix introspection:** fix introspection schema ([c7ef9bb](https://github.com/Enigmatis/polaris/commit/c7ef9bb))
* change middleware to run up to down ([39202a9](https://github.com/Enigmatis/polaris/commit/39202a9))
* lint fix ([a085d68](https://github.com/Enigmatis/polaris/commit/a085d68))

# [2.2.0](https://github.com/Enigmatis/polaris/compare/v2.1.0...v2.2.0) (2019-02-21)


### Features

* **soft delete middleware:** added soft delete middleware ([0d87441](https://github.com/Enigmatis/polaris/commit/0d87441))

# [2.1.0](https://github.com/Enigmatis/polaris/compare/v2.0.0...v2.1.0) (2019-02-18)


### Bug Fixes

* **introspection:** fix introspection ([6d13056](https://github.com/Enigmatis/polaris/commit/6d13056))


### Features

* **introspection:** not filtering type introspection ([38799b2](https://github.com/Enigmatis/polaris/commit/38799b2))
* **validation:** send validation error to client ([2864f84](https://github.com/Enigmatis/polaris/commit/2864f84))

# [2.0.0](https://github.com/Enigmatis/polaris/compare/v1.4.0...v2.0.0) (2019-02-11)


### Bug Fixes

* **fix headers cr:** fix ([120dee1](https://github.com/Enigmatis/polaris/commit/120dee1))
* **format response:** remove null from response ([415d5d7](https://github.com/Enigmatis/polaris/commit/415d5d7))
* **headers config default:** headers config default to true ([73ad739](https://github.com/Enigmatis/polaris/commit/73ad739))
* **heades:** throw error on headers ([e4f3dc4](https://github.com/Enigmatis/polaris/commit/e4f3dc4))
* **merge with master:** merge ([80871b3](https://github.com/Enigmatis/polaris/commit/80871b3))


### Features

* headers middleware ([0b27c02](https://github.com/Enigmatis/polaris/commit/0b27c02))
* **headers middleware:** dada version+ reality id ([dca3672](https://github.com/Enigmatis/polaris/commit/dca3672))


### BREAKING CHANGES

* **headers middleware:** configs

# [1.4.0](https://github.com/Enigmatis/polaris/compare/v1.3.0...v1.4.0) (2019-02-07)


### Features

* **db:** add interface for db-connection ([ea88c35](https://github.com/Enigmatis/polaris/commit/ea88c35))

# [1.3.0](https://github.com/Enigmatis/polaris/compare/v1.2.1...v1.3.0) (2019-01-31)


### Features

* **log:** print headers to log ([3b304a4](https://github.com/Enigmatis/polaris/commit/3b304a4))
* **log:** print headers to log ([a431bd9](https://github.com/Enigmatis/polaris/commit/a431bd9))

## [1.2.1](https://github.com/Enigmatis/polaris/compare/v1.2.0...v1.2.1) (2019-01-31)


### Bug Fixes

* jest configuration standard fixes ([2fcf134](https://github.com/Enigmatis/polaris/commit/2fcf134))
* pre-commit changes ([932b74b](https://github.com/Enigmatis/polaris/commit/932b74b))
* removed tsx and transform in jest config ([c91fb78](https://github.com/Enigmatis/polaris/commit/c91fb78))

# [1.2.0](https://github.com/Enigmatis/polaris/compare/v1.1.0...v1.2.0) (2019-01-30)


### Features

* **http-server:** change from express to kao as http server ([5ffce7d](https://github.com/Enigmatis/polaris/commit/5ffce7d))

# [1.1.0](https://github.com/Enigmatis/polaris/compare/v1.0.0...v1.1.0) (2019-01-29)


### Features

* **export:** main is now main.ts insted of index.ts ([976e38e](https://github.com/Enigmatis/polaris/commit/976e38e))


### Reverts

* **directive:** mistape fixed where file name not removed '[' ([46951af](https://github.com/Enigmatis/polaris/commit/46951af))

# 1.0.0 (2019-01-28)


### Bug Fixes

* **graphql:** run time error on query ([5dd2b18](https://github.com/Enigmatis/polaris/commit/5dd2b18))
