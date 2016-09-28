var config = {

    debug: true,
    name: 'trace',
    description: 'balabala..',
    keywords: 'hello world bye',

    gravatar: 'https://cdn.v2ex.com/gravatar',

    local_db: 'mongodb://127.0.0.1/trace',
    db: 'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/' + process.env.MONGODB_INSTANCE_NAME,

    qiniu:{
        access_key: '',
        secret_key: '',
        bucket_name: '',
        domain: ''
    }
};

module.exports = config;