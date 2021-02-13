const jwtUtils = require('../utils/jwt.utils');
const models = require('../../models');


module.exports = {

     // these middlewares verify if the user is the valid user or an admin before to do the next operation

    verifyUserBeforeDeleteArticle: async (req, res, next) => {
        const articleId = req.query.id;

        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0){
            return res.status(404).json({error: "Invalid user"});
        }

        const isUserAnAdmin = await models.User.findOne({
            attributes: ['isAdmin'],
            where: {id: userId}
        }).then(userFound => {
            if(!userFound){
                return res.status(400).json({error: 'User does not exist'});
            }
            return userFound.isAdmin;
        })
        .catch(err => {
            return res.status(500).json({ err });
        });

        const isUserTheCreatorOfArticle = await models.Article.findOne({
            attributes: ['userId', 'id'],
            where: {id: articleId}
        })
        .then(articleFound => {
            if(!articleFound){
                return res.status(400).json({error: 'Article does not exist'});
            }

            if(articleFound.dataValues.userId === userId){
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            return res.status(500).json({ err });
        });

        if(isUserAnAdmin || isUserTheCreatorOfArticle){
            next();
        } else {
            return res.status(500).json({error: 'User does not allow to carry out this operation'});
        }

    },
    verifyUserBeforeDeleteComment: async (req, res, next) => {
        const commentId = req.query.id;

        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0){
            return res.status(404).json({error: "Invalid user"});
        }

        const isUserAnAdmin = await models.User.findOne({
            attributes: ['isAdmin'],
            where: {id: userId}
        })
        .then(userFound => {
            if(!userFound){
                return res.status(400).json({error: 'User does not exist'});
            }

            return userFound.isAdmin;
        })
        .catch(err => {
            return res.status(500).json({ err });
        });

        const isUserTheCreatorOfComment = await models.Comment.findOne({
            attributes: ['userId'],
            where: {id: commentId}
        })
        .then(commentFound => {
            if(!commentFound){
                return res.status(400).json({error: 'Comment does not exist'});
            }

            if(commentFound.dataValues.userId === userId){
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            return res.status(500).json({ err });
        })

        
        if(isUserAnAdmin || isUserTheCreatorOfComment){
            next()
        } else {
            return res.status(400).json({error: "User not allow to do this operation"})
        }
    }
}