# Pwrlifter

## Build Setup

```
# install dependencies
$ npm install

# serve at localhost:3000 in development
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

```

## Examples

```
Look up the following users (I've populated them with data and videos):

- strongest
- moderately_strong
- not_so_strong
```

## Limitations
```
You won't be able to login or signup on this local client as AWS Cognito is configured for the production domain https://pwrlifter.com.

Sometimes NuxtJS is annoying, and you may get EPERM issues. You may need to delete .nuxt folder, or even node_modules folder. 
```