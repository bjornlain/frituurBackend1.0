// REQUIRES
const { Employee } = require('../../models');
const { trycatch } = require('../../utilities');


// PUBLIC METHODS
module.exports.list = trycatch(async (req, res) => {
  const teams = await Employee.distinct('teams').lean();
  return res.json(teams);
});