const Menu = require('../models/Menu');

module.exports = {
    addMenu: async (req, res) => {
        const newMenu = new Menu({
            nameOfMenu: req.body.dataState.nameOfMenu,
            data: req.body.dataState.data,
            overallB: req.body.dataState.overallB,
            overallR: req.body.dataState.overallR,
            overallA: req.body.dataState.overallA,
            overallKcal: req.body.dataState.overallKcal
        });

        newMenu.save().then(menu => res.json(menu)).catch(err => res.send(err));;
    },

    getMenu: async (req, res) => {
        // console.log(req.params.name);
        // Menu.findOne({ nameOfMenu: req.params.name })
        //     .then(menu => res.json(menu)).catch(err => res.send(err));

        Menu.find()
            .then(menu => res.json(menu)).catch(err => res.send(err));
    },
};
