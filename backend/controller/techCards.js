const TechCard = require('../models/TechCard');

module.exports = {
  addTechCard: async (req, res) => {
    console.log(req.body.data);
    const newTechCard = new TechCard({
      data: req.body.data
    });

    newTechCard.save().then(techCard => res.json(techCard)).catch(err => console.log(err));
  },

  getTechCard: async (req, res) => {
    return "heelo";
  },
};
