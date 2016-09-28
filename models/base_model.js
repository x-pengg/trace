module.exports = function (schema) {

    /** 可以是具体业务逻辑的一些数据验证,或者原始数据转换 **/
    schema.pre('save', function(next){
        var now = new Date();
        this.update_at = now;
        next();
    });

}