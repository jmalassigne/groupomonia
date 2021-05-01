//Imports
const models = require('../../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');


//constants
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/;
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const USERNAME_REGEX = /^[a-zA-Z]{5,50}$/;


module.exports = {
    signup: (req, res) => {
        const newUser = { ...req.body };

        if (!PASSWORD_REGEX.test(newUser.password)) {
            return res.status(401).json({ error: "Password must contains at least eight characters, one numeric digit, one uppercase and one lowercase letter" });
        }

        if (!EMAIL_REGEX.test(newUser.email)) {
            return res.status(401).json({ error: "Invalid email" });
        }

        if (!USERNAME_REGEX.test(newUser.username)) {
            return res.status(401).json({ error: "Username must contains at least 5 characters and a maximum of 50 without any numeric digit or special characters" });
        }

        models.User.findOne({
            where: { email: newUser.email }
        })
            .then(userFound => {
                if (userFound) {
                    return res.status(400).json({ error: 'User already exist' })
                }

                models.User.findOne({
                    where: { username: newUser.username }
                })
                    .then(usernameFound => {

                        if (usernameFound) {
                            return res.status(400).json({ error: 'Username already exist' })
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
                                        token: jwtUtils.generateTokenForUser(createdUser.id, createdUser.isAdmin)
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
        const userInfos = { ...req.body };

        models.User.findOne({
            attributes: ['id', 'password', 'isAdmin'],
            where: { email: userInfos.email }
        })
            .then(userFound => {

                if (!userFound) {
                    return res.status(404).json({ error: "User does not exist" })
                }

                bcrypt.compare(userInfos.password, userFound.password)
                    .then(isValid => {

                        if (!isValid) {
                            return res.status(400).json({ error: 'Invalid password' })
                        }

                        res.status(200).json({
                            token: jwtUtils.generateTokenForUser(userFound.id, userFound.isAdmin)
                        })

                    })
                    .catch(err => res.status(500).json({ err }))

            })
            .catch(err => res.status(500).json({ err }));

    },
    deleteAccount: (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const isUserAnAdmin = jwtUtils.getUserAdmin(headerAuth);

        if (userId < 0) {
            return res.status(404).json({ error: "Invalid user" });
        }

        if(isUserAnAdmin) {
            return res.status(400).json({error: "Admins can not delete their account."})
        }

        models.Like.destroy({
            where: {userId: userId}
        })
        .catch(err => { return res.status(500).json({ err }) });

        models.Comment.destroy({
            where: {userId: userId}
        })
        .catch(err => { return res.status(500).json({ err }) });

        models.Article.destroy({
            where: {userId: userId}
        })
        .catch(err => { return res.status(500).json({ err }) });

        models.User.destroy({
            where: {id: userId}
        })
        .then(() => {
            return res.status(204).json({message: 'User deleted successfully'})
        })
        .catch(err => res.status(500).json({ err }));
    },
    getUser: async (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(404).json({ error: "Invalid user" });
        }

        let dataToSend = {};

        const userDataToSend = await models.User.findOne({
            attributes: ['email', 'username', 'isAdmin', 'createdAt'],
            where: { id: userId }
        })
            .then(userFound => {
                if (userFound != null) {
                    return userFound.dataValues;
                } else {
                    res.json(404).json({ error: 'Utilisateur introuvable.' })
                }

            })
            .catch(err => res.status(500).json({ err }));

        const lastArticleToSend = await models.Article.findOne({
            attributes: ['createdAt'],
            where: { userId: userId },
            order: [['createdAt', 'DESC']]
        })
            .catch(err => res.status(500).json({ err }));



        const lastCommentToSend = await models.Comment.findOne({
            attributes: ['createdAt'],
            where: { userId: userId },
            order: [['createdAt', 'DESC']]
        })
            .catch(err => res.status(500).json({ err }));

        const numberOfArticles = await models.Article.count({
            where: { userId: userId }
        })
            .catch(err => res.status(500).json({ err }));

        const numberOfComments = await models.Comment.count({
            where: { userId: userId }
        })
            .catch(err => res.status(500).json({ err }));


        //Adding user's data to dataToSend
        dataToSend.user = userDataToSend;

        //Adding last article to dataToSend
        if (lastArticleToSend != null) {
            dataToSend.lastArticle = lastArticleToSend;
        }

        //Adding last comment to dataToSend
        if (lastCommentToSend != null) {
            dataToSend.lastComment = lastCommentToSend;
        }

        //Adding number of articles to dataToSend
        dataToSend.numberOfArticles = numberOfArticles;

        //Adding number of comments to dataToSend
        dataToSend.numberOfComments = numberOfComments;



        res.status(200).json({ dataToSend });
    }
}