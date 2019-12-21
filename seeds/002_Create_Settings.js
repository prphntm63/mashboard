exports.seed = function(knex) {
  console.log('Seeding 002-Settings...')

  return knex('Settings').insert( createSettings() )
  .catch(err => {console.log('users error - ', err)});;
};

function createSettings() {
  return [
    {
      "id": "mash",
      "params" : JSON.stringify({
        "batch" : "testBatch1",
        "setTemp" : 153,
        "mode": "heat", //heat cool or off
        "hys" : 4,
        "stir" : true,
        "stirSpeed" : 10,
      })
    },
    {
      "id": "ferm1",
      "params" : JSON.stringify({
        "batch" : "testBatch2",
        "setTemp" : 77,
        "mode": "cool", //cool or off
        "hys" : 2,
        "stir" : false,
        "stirSpeed" : 10,
      })
    },
    {
      "id": "ferm2",
      "params" : JSON.stringify({
        "batch" : "testBatch3",
        "setTemp" : 85,
        "mode": "off", //cool or off
        "hys" : 2,
        "stir" : false,
        "stirSpeed" : 0,
      })
    },
    {
      "id": "still",
      "params" : JSON.stringify({
        "batch" : "testBatch4",
        "setTemp" : 182,
        "mode": "heat", //heat, cool, or off
        "hys" : 1,
        "stir" : false,
        "stirSpeed" : 10,
      })
    },
    {
      "id": "chiller",
      "params" : JSON.stringify({
        "mode" : "run", //run or off
        "freq" : 42,
        "maxPower" : 1500
      })
    }
  ]
}

// .createTable('Settings', table => {
//   table.enum('id', [
//       'mash',
//       'ferm1',
//       'ferm2',
//       'still',
//       'chiller'
//   ]).primary()
//   table.timestamp('mtime').defaultTo(knex.fn.now())
//   table.json('params')
