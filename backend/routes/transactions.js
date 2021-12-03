const router = require('express').Router();
const axios = require('axios');
let User = require('../models/user.model');

router.route('/send').post((req, res) => {
    //sender
    User.updateOne(
        { Id: req.body.data.Id },
        { $set: { Balance: req.body.balance - parseInt(req.body.amount) } }
    )
        .catch(err => console.log(err));
    //reciever
    User.updateOne(
        {
            AccountNumber: parseInt(req.body.accountNumber),
            Beneficiary: req.body.beneficiary,
        },
        { $inc: { Balance: parseInt(req.body.amount) } }
    )
        .catch(err => console.log(err));
});

// router.route('/auth').post((req, res) => {
//     const id = parseInt(req.body.id);
//     const pass = req.body.pass;
//     User.find()
//         .then(users => {
//             users.forEach(user => {
//                 if (user.Id === id) {
//                     if (user.Pass === pass) {
//                         res.json('User authenticated!')
//                     }
//                 }
//             });
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//     const Id = req.body.id;
//     const Pass = req.body.password;
//     const Beneficiary = req.body.beneficiary;
//     const AccountNumber = req.body.accountNumber;
//     const Balance = 0;

//     const newUser = new User({ Id, Pass, Beneficiary, AccountNumber, Balance });

//     newUser.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;