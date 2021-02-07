//Imports
const models = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//constants
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-zA-Z]{5,50}$/;
const SECRET_TOKEN = 'ja18k9kjd01kdj7dj1278j8k4d12bv';
const TOKEN_LIMIT = '1h';

module.exports = {
    signup: (req, res) => {
        const newUser = {...req.body};

        if(!PASSWORD_REGEX.test(newUser.password)){
            return res.status(401).json({error: "Password must contains at least eight characters, one numeric digit, one uppercase and one lowercase letter"});
        } 

        if(!EMAIL_REGEX.test(newUser.email)){
            return res.status(401).json({error: "Invalid email"});
        } 

        if(!USERNAME_REGEX.test(newUser.username)){
            return res.status(401).json({error: "Username must contains at least 5 characters and a maximum of 50 without any numeric digit or special characters"});
        } 

        models.User.findOne({
            where: {email: newUser.email}
        })
            .then(userFound => {
                if(userFound){
                    return res.status(400).json({error: 'User already exist'})
                }

                models.User.findOne({
                    where: {username: newUser.username}
                })
                    .then(usernameFound => {

                        if(usernameFound){
                            return res.status(400).json({error: 'Username already exist'})
                        }

                        bcrypt.hash(newUser.password, 10)
                            .then(hash => {
                                models.User.create({
                                    username: newUser.username,
                                    email: newUser.email,
                                    password: hash,
                                    isAdmin: 0
                                })
                                    .then(createdUser => res.status(201).json({
                                        id: createdUser.id,
                                        token: jwt.sign(
                                            {userId: createdUser.id},
                                            SECRET_TOKEN,
                                            {expiresIn: TOKEN_LIMIT})
                                    }))
                                    .catch(err => res.status(500).json({ err }))
                            })
                            .catch(err => res.status(500).json({ err }))


                    })
                    .catch(err => res.status(500).json({ err }))
            })
            .catch(err => res.status(500).json({ err }))
        
    },
    login: (req, res) => {
        const userInfos = {...req.body};

        models.User.findOne({
            attributes: ['id', 'password'],
            where: {email: userInfos.email}
        })
            .then(userFound => {

                if(!userFound){
                    return res.status(500).json({error: "User does not exist"})
                }

                bcrypt.compare(userInfos.password, userFound.password)
                    .then(isValid => {

                        if(!isValid){
                            return res.status(400).json({error: 'Invalid password'})
                        }

                        res.status(200).json({
                            id: userFound.id,
                            token: jwt.sign(
                                {userId: userFound.id},
                                SECRET_TOKEN,
                                {expiresIn: TOKEN_LIMIT}
                            )
                        })

                    })
                    .catch(err => res.status(500).json({ err }))

            })
            .catch(err => res.status(500).json({ err }))
         
    },
    deleteAccount: (req, res) => {

    }
}