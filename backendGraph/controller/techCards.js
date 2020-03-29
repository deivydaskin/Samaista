const TechCard = require('../models/TechCard');

module.exports = {
  addTechCard: async (req, res) => {
    const newTechCard = new TechCard({
      nameOfCard: req.body.dataState.nameOfCard,
      description: req.body.dataState.description,
      data: req.body.dataState.data,
      overallB: req.body.dataState.overallB,
      overallR: req.body.dataState.overallR,
      overallA: req.body.dataState.overallA,
      overallKcal: req.body.dataState.overallKcal,
      yield: req.body.dataState.yield
    });

    newTechCard.save().then(techCard => res.json(techCard)).catch(err => res.send(err));;
  },

  getTechCard: async (req, res) => {
    console.log(req.params.name);
    TechCard.findOne({ nameOfCard: req.params.name })
      .then(techCards => res.json(techCards)).catch(err => res.send(err));
  },

  getTechCardsAll: async (req, res) => {
    TechCard.find()
      .then(techCards => res.json(techCards)).catch(err => res.send(err));
  }
};
