const jwtUtils = require('../utils/jwt.utils');
const models = require('../../models');

module.exports = {
    createLike: async (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const value = req.body.likeValue;
        const articleId = req.query.id;

        if(userId < 0){
            return res.status(404).json({error: "Invalid user"});
        }
        
        if(!(value === 0 || value === 1)){
            return res.status(400).json({error: 'Invalid parameters'})
        }

        const isUserAlreadyLikeArticle = await models.Like.findOne({
            where: {
                userId: userId,
                articleId: articleId
            }
        })
        .then(likeFound => {
            if(!likeFound){
                return false;
            }

            return likeFound;

        })
        .catch(err => res.status(500).json({ err }))


        if(!isUserAlreadyLikeArticle){
            
            models.Like.create({
                userId: userId,
                articleId: articleId,
                value: value
            })
            .then(() => res.status(201).json({message: 'Like created successfully'}))
            .catch(err => res.status(500).json({ error }))

        } else {

            const newValue = isUserAlreadyLikeArticle.value;
            const currentValue = value === 0 ? false : true;

            if(newValue === currentValue){
                return res.status(400).json({error: "User already do this operation"})
            } else {
                
                models.Like.destroy({
                    where: {
                        userId: userId,
                        articleId: articleId
                    }
                })
                .then(() => {
                    
                    models.Like.create({
                        userId: userId,
                        articleId: articleId,
                        value: value
                    })
                    .then(() => res.status(201).json({message: "Change take into account"}))
                    .catch(err => res.status(500).json({ err }))

                })
                .catch(err => res.status(500).json({ err }))

            }
            
            

        }

        
    },

    deleteLike: async (req,res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const articleId = req.query.id;

        if(userId < 0) {
            return res.status(404).json({error: "Invalid user"});
        }

        const isUserActuallyLike = await models.Like.findOne({
            where: {
                userId: userId,
                articleId: articleId
            }
        })
        .then(likeFound => {
            if(!likeFound){
                return false;
            } else {
                return true;
            }
        })
        .catch(err => res.status(500).json({ err }))

        if (!isUserActuallyLike){
            return res.status(400).json({error: 'User does not actually like this article'});
        } else {
            
            models.Like.destroy({
                where: {
                    articleId: articleId,
                    userId: userId
                }
            })
            .then(() => res.status(200).json({message: "Like deleted successfully"}))
            .catch(err => res.status(500).json({ err }))

        }
    }
}