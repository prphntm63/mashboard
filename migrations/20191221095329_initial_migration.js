
exports.up = function(knex) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return knex.schema
        .createTable('Users', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.timestamp('mtime').defaultTo(knex.fn.now())
            table.string('email')
            table.string('hashedPassword')
            table.string('firstName')
            table.string('lastName')
        })
    })

    
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('Users')
};
