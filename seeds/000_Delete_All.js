

exports.seed = function(knex) {
  console.log('Seeding 000-Delete All')
  // Deletes ALL existing entries
  
  return knex.select('*').from('Log').del()
  .then(() => {return knex.select('*').from('Settings').del()})
  .then(() => {return knex.select('*').from('Users').del()})

};