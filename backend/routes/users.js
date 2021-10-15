const router = require('express').Router();
const axios = require('axios');
let User = require('../models/user.model');

router.route('/auth').post((req, res) => {
    User.find()
        .then(users => {
            console.log(users)
        })
});

router.route('/add').post((req, res) => {
    const Id = req.body.id;
    const Pass = req.body.password;
    const Beneficiary = req.body.beneficiary;
    const AccountNumber = req.body.accountNumber;
    const Balance = 0;

    const newUser = new User({Id, Pass, Beneficiary, AccountNumber, Balance});
    
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json(' fucking  bad  Error: ' + err));
});

module.exports = router;