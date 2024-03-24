const plans = require("../models/plan");

exports.choosePlan = (req, res) => {
  const newPlan = req.body;
  const chosenPlan = plans.choose(newPlan);
  res.json(chosenPlan);
};
