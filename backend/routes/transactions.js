const router = require('express').Router();
const axios = require('axios');
let User = require('../models/user.model');
let Transaction = require('../models/transaction.model');

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

router.route('/log').post((req, res) => {
    const Sender = req.body.data.Beneficiary;
    const Beneficiary = req.body.beneficiary;
    const AccountNumber = parseInt(req.body.accountNumber);
    const Amount = parseInt(req.body.amount);

    const newTransaction = new Transaction({ Sender, Beneficiary, AccountNumber, Amount });

    newTransaction.save()
        .then(() => res.json('Transaction added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').post((req, res) => {
    Transaction.find()
        .then(transactions => {
            res.json(transactions)
            // var list;
            // transactions.forEach(transaction => {
            //     if (req.body.userData.Beneficiary == transaction.Sender) {
            //         list.push(transaction);
            //         console.log(list)
            //     }
            // });
            // res.json(list);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;