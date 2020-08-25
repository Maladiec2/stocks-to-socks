const router = require('express').Router();
let Log = require('../models/userLog.model');

router.route('/').get((req, res) => {
    Log.find()
        .then(logs => res.json(logs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const eventType = req.body.eventType;
    const description = req.body.description;

    const newLog = new Log({ eventType, description });

    newLog.save()
        .then(() => res.json('Log added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;