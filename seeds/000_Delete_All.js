

exports.seed = function(knex) {
  console.log('Seeding 000-Delete All')
  // Deletes ALL existing entries
  
  return knex.select('*').from('Chiller').del()
  .then(() => {return knex.select('*').from('Still').del()})
  .then(() => {return knex.select('*').from('Ferm2').del()})
  .then(() => {return knex.select('*').from('Ferm1').del()})
  .then(() => {return knex.select('*').from('Mash').del()})
  .then(() => {return knex.select('*').from('Batches').del()})
  .then(() => {return knex.select('*').from('Users').del()})

};