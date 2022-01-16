const express = require("express");
const { addUser, depositMoney,
    updateCredit,
    withdrawMoney,
    transferMoney,
    readUser,
    allUsersData } = require("../controllers/accounts.controller.js");
const userRouter = express.Router();


userRouter.get("/bankapi/", (req, res) => {
    try {
            const usersData = allUsersData();
            res.status(200).send(usersData);
        
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

userRouter.get("/bankapi/:userId", (req, res) => {
    try {
        const user = readUser(req.params.userId);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

userRouter.post("/bankapi/", (req, res) => {
    try {
        addUser(req.body);
        res.status(200).send(req.body);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

userRouter.post("/bankapi/deposit/:id/:amount", (req, res) => {
    try {
        const updatedAccount = depositMoney(req.params.amount, req.params.id);
        res.status(200).send(updatedAccount);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

userRouter.post("/bankapi/updatecredit/:id/:amount", (req, res) => {
    try {
        const updatedAccount = updateCredit(req.params.amount, req.params.id);
        res.status(200).send(updatedAccount);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

userRouter.post("/bankapi/withdraw/:id/:amount", (req, res) => {
    try {
        const updatedAccount = withdrawMoney(req.params.amount, req.params.id);
        res.status(200).send(updatedAccount);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

userRouter.post(
    "/bankapi/transfer/:senderId/:receiverId/:amount",
    (req, res) => {
        try {
            const updatedAccounts = transferMoney(
                req.params.senderId,
                req.params.receiverId,
                req.params.amount
            );
            res.status(200).send(updatedAccounts);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }
);

//long paths please use the router / app .use() to define the route before that file functionality
// move the req ,res function to the controllers that not make the code shorter just complex unreadable and longer

module.exports = userRouter;
