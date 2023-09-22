'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const { PayloadTooLargeError } = require('@strapi/utils').errors;

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'strapi-provider-upload-local-full-path',
  name: 'Local server',
  init: (config) => {
	const verifySize = (file) => {
      if (file.size > config.sizeLimit) {
        throw new PayloadTooLargeError();
      }
    };

    return {
	  uploadStream(file) {
        verifySize(file);

        return new Promise((resolve, reject) => {
          pipeline(
            file.stream,
            fs.createWriteStream(path.join(strapi.dirs.static.public, config.path, `${file.hash}${file.ext}`)),
            (err) => {
              if (err) {
                return reject(err);
              }

              file.url = new URL(path.join(config.url, config.path, `/${file.hash}${file.ext}`));

              resolve();
            }
          );
        });
      },
      upload: (file) => {
        return new Promise((resolve, reject) => {
          // write file in configured folder
          fs.writeFile(path.join(strapi.dirs.static.public, config.path , `/${file.hash}${file.ext}`), file.buffer, (err) => {
            if (err) {
              return reject(err);
            }

            file.url = new URL(path.join(config.url, config.path , `/${file.hash}${file.ext}`));

            resolve();
          });
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          const filePath = path.join(strapi.dirs.static.public, config.path , `/${file.hash}${file.ext}`);

          if (!fs.existsSync(filePath)) {
            return resolve('File doesn\'t exist');
          }

          // remove file from public/assets folder
          fs.unlink(filePath, (err) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      }
    };
  }
};
