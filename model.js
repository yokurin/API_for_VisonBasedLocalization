var model = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.visionbased || '127.0.0.1',
        user: 'root',
        password: '',
        database: 'visionbased'
    },
    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 7
    }
});

module.exports = model;
