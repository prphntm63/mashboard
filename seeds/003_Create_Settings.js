exports.seed = function(knex) {
  console.log('Seeding 003-Settings...')

  return knex.from('Batches')
  .pluck('id')
  .then(ids => {
    

    return knex('Mash')
    .insert({
      "batch" : (ids.length > 0 ? ids[0] : null),
      "setTemp" : 153,
      "mode": "heat", //heat cool or off
      "hys" : 4,
      "stir" : true,
      "stirSpeed" : 10,
    })
    .then(() => {
      return knex('Ferm1')
      .insert({
        "batch" : (ids.length > 1 ? ids[1] : null),
        "setTemp" : 77,
        "mode": "cool", //cool or off
        "hys" : 1,
        "stir" : false,
        "stirSpeed" : 10,
      })
    })
    .then(() => {
      return knex('Ferm2')
      .insert({
        "batch" : (ids.length > 2 ? ids[2] : null),
        "setTemp" : 83,
        "mode": "off", //cool or off
        "hys" : 2,
        "stir" : false,
        "stirSpeed" : 10,
      })
    })
    .then(() => {
      return knex('Still')
      .insert({
        "batch" : (ids.length > 3 ? ids[3] : null),
        "setTemp" : 182,
        "mode": "heat", //heat, cool, or off
        "hys" : 1,
        "stir" : false,
        "stirSpeed" : 10,
      })
    })
    .then(() => {
      return knex('Chiller')
      .insert({
        "mode" : "run", //run or off
        "freq" : 42,
        "maxPower" : 1500
      })
    })
    .catch(err => {console.log('settings error - ', err)});

  })
};