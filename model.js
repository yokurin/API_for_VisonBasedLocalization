var model = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.GOJO_MYSQL,
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
