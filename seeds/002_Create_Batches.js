
exports.seed = function(knex) {
  console.log('Seeding 002-Batches...')
  return knex('Batches')
  .insert( generateBatches() )
};

function generateBatches() {
  let batches = []
  for (let batchNo = 0; batchNo < 4; batchNo++) {
    batches.push({
      "name" : `Test Batch ${batchNo}`,
      "description" : `Test Batch ${batchNo} started on ${new Date()}`
    })
  }
  return batches
}