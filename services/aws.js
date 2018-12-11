var aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

var s3 = new aws.S3();

const bucket = 'pet-prenup';
/**
 * Upload file
 */
exports.uploadFile = function(fileName, file, resolve, reject) {
  s3.upload(
    {
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ACL: 'public-read',
    },
    function(err, data) {
      if (err) {
        // console.log('aws', error);
        reject(err);
      } else {
        // console.log('aws', data);
        resolve(data);
      }
    }
  );
};

/**
 * Delete file
 */
exports.deleteFile = function(req, res, next) {
  s3.deleteObject({ Bucket: bucket, Key: req.params.id }, function(err, data) {
    if (err) {
      console.log('Delete error ', err);
      next(err);
    } else {
      res.json({ success: 'File deleted.' });
    }
  });
};

const multer = require('multer');
var multerS3 = require('multer-s3');
exports.saveFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});
