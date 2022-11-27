[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Prepare to start

Install `zx` package globally 
~~~
npm i -g zx
~~~

build package with shared code `@anteqkois/server` and install in dapp
~~~
cd server && npm run lib
~~~
and next linkt to library
~~~
cd dapp && npm link @anteqkois/server
~~~
or install as a file 
~~~
npm install --S ../server/dist
~~~