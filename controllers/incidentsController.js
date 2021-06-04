const Incident = require("../models/incidentsModel");

module.exports = {
  index: (req, res) => {
    Incident.get(req.db, (err, result) => {
      if (err) return console.error(err)
      res.send(result);
    });
  },
  create: (req, res) => {
    // TODO дописать 
  },
  edit: (req, res) => {
    
  }
};
