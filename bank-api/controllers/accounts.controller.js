const fs = require("fs");
const usersData = JSON.parse(fs.readFileSync("usersData.json").toString());
// dont do it on top of the file make a function that do it each time that you want to do it you dont want to save data inside your server this is a bad practis
// more then that this is not a usersData just users by the way every type is kind of some data even a string , number or boolean

const checkUser = (userId) => {
    if (!usersData.find((account) => account.id == userId)) throw new Error("no such user please enter correct id");
    // move to utils
    / move to utils isUserExist and this function should return true or false 
// and remove the Error from here throw it insie try and catch inside a controller function
    // use try and catch
};


const addUser = (user) => {
    
    // const {user} = req.body
    // like that someone that see your code know what you are need to get in the data you are not the only one that works on this code (:
    
    if (usersData.find((account) => account.id === user.id)) throw new Error("user id taken");
 // move to utils
    / move to utils isUserExist and this function should return true or false 
// and remove the Error from here throw it insie try and catch inside a controller function
    // use try and catch
    
    usersData.push(user);
    // again users not usersData
    fs.writeFileSync("usersData.json", JSON.stringify(usersData));
    // write as a saveUsers function and move to utils
    return usersData;
};

const depositMoney = (amount, userId) => {
    checkUser(userId);
    // see above
    const updatedData = usersData.map(account => {
        if (account.id == userId) {
            return {
                name: account.name,
                id: account.id,
                cash: +account.cash + +amount,
                credit: account.credit,
            };
            // clearer we dont use Number anymore this is out of our scope maybe in a rare cases this is not one of them
        } else {
            return account;
        }
    });

    fs.writeFileSync("usersData.json", JSON.stringify(updatedData));
    return updatedData.find((account) => account.id == userId);
    // never return a function to res.send this can make some errors in the end and this is unclear
    
};

const updateCredit = (amount, userId) => {
    if (amount < 0) {
        throw new Error("only positive amount");
    }
    checkUser(userId);
    const updatedData = usersData.map((account) => {
        // move to utils i see this code in the second time (:
        if (account.id == userId) {
            return {
                name: account.name,
                id: account.id,
                cash: account.cash,
                credit: Number(account.credit) + Number(amount),
            };
        } else {
            return account;
        }
    });
    // maybe increaseCreditAmount is a better name think about it

    fs.writeFileSync("usersData.json", JSON.stringify(updatedData));
    // see above
    return updatedData.find(account => account.id == userId);
    // see above this fcuntion sould call findUserById(users, id) or findUser
};

const withdrawMoney = (amount, userId) => {
    checkUser(userId);

    const updatedData = usersData.map((account) => {
        if (account.id == userId && account.cash >= amount) {
            return {
                id: account.id,
                cash: Number(account.cash) - Number(amount),
                credit: account.credit,
            };
        } else {
             throw new Error("there is no sufficient funds");
        }
    });

    fs.writeFileSync("usersData.json", JSON.stringify(updatedData));
    return updatedData.find(account => account.id == userId);

};

const transferMoney = (senderId, receiverId, amount) => {
    checkUser(senderId);
    checkUser(receiverId);
    const updatedData = usersData.map((account) => {
        if (account.id == senderId) {
            if (account.cash > amount) {
                return {
                    name: account.name,
                    id: account.id,
                    cash: Number(account.cash) - Number(amount),
                    credit: account.credit,
                };
            } else throw new Error("there is no sufficient funds in the sender account");
        }
        if (account.id == receiverId) {
            return {
                name: account.name,
                id: account.id,
                cash: Number(account.cash) + Number(amount),
                credit: account.credit,
            };
        } else {
            return account;
        }
    });

    fs.writeFileSync("usersData.json", JSON.stringify(updatedData));
    return usersData;
};

const readUser = (userId) => {
    checkUser(userId);

    return usersData.find((account) => account.id == userId);
};

const allUsersData = () => usersData;
// you make afunction that return you a const that you put in the top of the file that dasnt make sence ):


module.exports = {
    addUser,
    depositMoney,
    updateCredit,
    withdrawMoney,
    transferMoney,
    readUser,
    allUsersData
};

// hard work make perfect
