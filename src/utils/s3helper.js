const AWS = require('aws-sdk');
const fs = require('fs');
const { CONSTANTS } = require('../config');

//initialize S3 instance
const s3Config = {
    apiVersion : '2006-03-01',
    accessKeyId: CONSTANTS.S3.S3_ACCESS_KEY_ID,
    secretAccessKey: CONSTANTS.S3.S3_SECRET_ACCESS_KEY,
    region : CONSTANTS.S3.S3_REGION
};

const s3 = new AWS.S3(s3Config);

//upload file
exports.upload = async(file,key) => {
    //setting s3 parameters
    const params = {
        Bucket : CONSTANTS.S3.S3_BUCKET,
        Key : key,
        Body : file.data,
        ContentType : file.mimetype
    };

    //uploading files to bucket
    const data = await s3.upload(params).promise();
    return data.Location;
}; 

//access the private object
exports.getAccessURL = async(key) => {
    const url = await s3.getSignedUrlPromise('getObject',{
        Bucket : CONSTANTS.S3.S3_BUCKET,
        Key : key,
        Expires : 60
    });
    return url;
};

//delete the image
exports.delete = (key) => {
    s3.deleteObject({
        Bucket : CONSTANTS.S3.S3_BUCKET,
        Key : key
    });
}
