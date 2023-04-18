const query = require('../models/dbModel')


const sessionController = {};

sessionController.signUp = async (req, res, next) => {
    const {email, pw} = req.body;

    const find = `SELECT email FROM users
                    WHERE email = ${email}`


    const insert = `INSERT INTO users (${email}, ${pw})
    VALUES (email, pw)`

    try {
        await query(insert, (err, result) => {
            if (err) {
                return next('Error signing up', err);
            } else {
                res.locals.userData = result
                return next();
            }
        });
    } catch (error) {
        return next('Error getting signing up', error)
    }
};

