//Imports
const models = require('../../models');
const bcrypt = require('bcrypt')

//constants
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-zA-Z]{5,50}$/;

module.exports = {
    signup: (req, res) => {
        const newUser = {...req.body};

        if(!PASSWORD_REGEX.test(newUser.password)){
            return res.status(401).json({error: "Password must contains at least eight characters, one numeric digit, one uppercase and one lowercase letter"});
        } 

        if(!EMAIL_REGEX.test(newUser.email)){
            return res.status(401).json({error: "Invalid email"})
        } 

        if(!USERNAME_REGEX.test(newUser.username)){
            return res.status(401).json({error: "Username must contains at least 5 characters and a maximum of 50 without any numeric digit or special characters"})
        } 

        bcrypt.hash(newUser.password, 10)
            .then(hash => {
                models.User.create({
                    username: newUser.username,
                    email: newUser.email,
                    password: hash,
                    isAdmin: 0
                })
                    .then(createdUser => res.status(201).json(createdUser.id))
                    .catch(err => res.status(500).json({ err }))
            })
            .catch(err => res.status(500).json({ err }))
        
    },
    login: (req, res) => {

    },
    updateAccount: (req, res) => {

    },
    deleteAccount: (req, res) => {

    }
}