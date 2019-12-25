
exports.up = function(knex) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return knex
        .schema
        .createTable('Users', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.timestamp('mtime').defaultTo(knex.fn.now())
            table.string('email')
            table.string('hashedPassword')
            table.string('firstName')
            table.string('lastName')
        })
        .createTable('Batches', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique()
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.timestamp('mtime').defaultTo(knex.fn.now())
            table.string('name')
            table.string('description')
            table.json('mashData')
            table.json('fermData')
            table.json('stillData')
        })
        .createTable('Mash', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.float("setTemp").defaultTo(72)
            table.float("currentTemp")
            table.enum("mode", ['heat', 'cool', 'off']).defaultTo('off')
            table.float("hys").defaultTo(3)
            table.boolean("stir").defaultTo(false)
            table.float("stirSpeed").defaultTo(10)
            table.uuid('batch').references('id').inTable('Batches')
        })
        .createTable('Ferm1', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.float("setTemp").defaultTo(72)
            table.float("currentTemp")
            table.enum("mode", ['cool', 'off']).defaultTo('off')
            table.float("hys").defaultTo(2)
            table.boolean("stir").defaultTo(false)
            table.float("stirSpeed").defaultTo(10)
            table.uuid('batch').references('id').inTable('Batches')
        })
        .createTable('Ferm2', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.float("setTemp").defaultTo(72)
            table.float("currentTemp")
            table.enum("mode", ['cool', 'off']).defaultTo('off')
            table.float("hys").defaultTo(2)
            table.boolean("stir").defaultTo(false)
            table.float("stirSpeed").defaultTo(10)
            table.uuid('batch').references('id').inTable('Batches')
        })
        .createTable('Still', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.float("setTemp").defaultTo(72)
            table.float("currentTemp")
            table.enum("mode", ['heat', 'cool', 'off']).defaultTo('off')
            table.float("hys").defaultTo(1)
            table.boolean("stir").defaultTo(false)
            table.float("stirSpeed").defaultTo(10)
            table.uuid('batch').references('id').inTable('Batches')
        })
        .createTable('Chiller', table => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.enum("mode", ['run', 'off']).defaultTo('off')
            table.float("freq").defaultTo(42),
            table.float("currentFreq")
            table.float("maxPower").defaultTo(1500)
            table.float("currentPower")
        })
        
    }) 
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('Mash')
    .dropTable('Ferm1')
    .dropTable('Ferm2')
    .dropTable('Still')
    .dropTable('Chiller')
    .dropTable('Batches')
    .dropTable('Users')
};
