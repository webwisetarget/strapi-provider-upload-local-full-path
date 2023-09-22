# strapi-provider-upload-local-full-path

## Attention!

This package is still under development and it was created for a personal use-case. It is not mature enough to be used without any bugs.

One major issue I'm working on fixing next is to prevent the strapi admin from adding the server url before the media's absolute url when opening the media library.
Also instead of fixing this, I will re-implement it without saving the absolute url in the database.

## Install

`npm install strapi-provider-upload-local-full-path` 

## Description

Enables you to use configurable path and return absolute files urls.

1. Reads the path from the environment variables.

## Set Path
You need to add a new property called `path` to your `config/plugins` file.

```
// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    provider: 'strapi-provider-upload-local-full-path',
    providerOptions: {
	  sizeLimit: 100000,
      path: env('UPLOADS_FOLDER', 'uploads'),
      url: env('UPLOADS_PATH', '/'),
    },
  },
});
```
You can rename the `environment variables` as you like.


## Resources

- [MIT License](LICENSE.md)