var Photo = require('../models/index').Photo;
var mongoose = require('mongoose');

/**
 * 保存照片
 * @param photo_url 图片地址
 * @param location 拍摄地点
 * @param camera 设备
 * @param user_id 用户
 * @param callback
 */
exports.createPhoto = function (photo_url, lat, lon, camera, user_id, callback) {

    var photo = new Photo({
        photo_url: photo_url,
        lat: lat,
        lon: lon,
        camera: camera,
        user_id: user_id
    });

    photo.save(callback);
};

/**
 * 查询用户的照片
 * @param id
 * @param callback
 */
exports.findPhotoByUser = function (id, callback) {
    Photo.find({user_id: id}, callback)
};

/**
 * 分页查询照片
 * @param callback
 */
exports.findPhotos = function (start, size, callback) {
        start = (start-1)*size;
    Photo.find({}, {},{sort: {moment : -1}, limit : size, skip: start}, callback);
};
/**
 * 查询全部照片
 * @param callback
 */
exports.findAll = function (callback) {
    Photo.find({}, callback);
};

/**
 * 根据照片id查询照片
 * @param id 57d9180c550fb52f7466f5e3
 * @param cb
 */
exports.findById = function (id, cb) {
    Photo.findOne({_id:  mongoose.Types.ObjectId(id)}, cb)
}