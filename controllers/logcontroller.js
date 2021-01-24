let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

// router.get('/practice', validateSession, function(req, res)
// {
//     res.send('Hey!! This is a practice route!')
// });

/* *********************************
*** CREATE WORKOUT LOG ***
******************************* */
router.post('/', validateSession, (req, res) => {
    const LogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    }
    Log.create(LogEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
});

/* *********************************
*** GET ALL LOGS FOR INDIVIDUAL USER ***
******************************* */
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner_id: userid }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/* *********************************
*** GETS INDIVIDUAL LOGS BY ID FOR AN INDIVIDUAL USER ***
******************************* */
router.get('/:id', validateSession, function (req, res) {
    let id = req.params.id;

    Log.findAll({
        where: { id: id }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/* *********************************
*** UPDATE LOG BY INDIVIDUAL USER ***
******************************* */
router.put("/:id", validateSession, function (req, res) {
    const updateEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
    };

const query = { where: { id: req.params.id, owner_id: req.user.id } };

Log.update(updateEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/* *********************************
*** ALLOWS INDIVIDUAL LOGS TO BE DELETED BY A USER ***
******************************* */
router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id } }; //params points to the URL

    Log.destroy(query) //.destroy() is a sequelize method to remove an item from a database - query tells Sequelize what to look for in trying to find an item to delete. If nothing matches, nothing is done.
        .then(() => res.status(200).json({ message: "Workout Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;

