const jwtUtils = require('../utils/jwt.utils');
const models = require('../../models');

module.exports = {
    createArticle: (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const newArticle = {...req.body};

        if(userId < 0){
            return res.status(404).json({error: "Invalid user"});
        }

        if(newArticle.title.length > 50 || newArticle.title.length < 5){
            return res.status(404).json({error: "Title must contains at least 5 characters and a maximum of 50"})
        }

        if(newArticle.content.length < 50){
            res.status(400).json({ error: "Article content must contains at least 50 characters"})
        }
        
        models.User.findOne({
            attributes: ['id'],
            where: {id: userId}
        })
            .then(userfound => {

                if(!userfound){
                    return res.status(400).json({error: 'Invalid user'});
                }

                models.Article.create({
                    title: newArticle.title,
                    content: newArticle.content,
                    UserId: userfound.id
                })
                    .then(() => res.status(201).json({message: 'Article created successfuly'}))
                    .catch(err => res.status(500).json({ err }))

            })
            .catch(err => res.status(500).json({ err }))

    },
    listArticles: (req, res) => {
        
    },
    findArticle: (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const articleId = req.query.id;

        if(userId < 0){
            return res.status(404).json({error: "Invalid user"});
        }

        if(!articleId){
            return res.status(400).json({error: "missing parameters"})
        }

        models.Article.findOne({
            attributes: ['title', 'content', 'createdAt'],
            where: {id: articleId}
        })
        .then(articleFound => {
            if(!articleFound){
                return res.status(404).json({error: 'Article does not exist'})
            }

        
        })
        .catch(err => res.status(500).json({ err }))

    },
    deleteArticle: (req, res) => {
        const articleId = req.query.id;
        
        models.Comment.destroy({
            where: {articleId : articleId}
        }).then(() => {

            models.Article.destroy({
                where: {id: articleId}
            })
            .then(() => res.status(200).json({message: 'Article deleted sucessfully'}))
            .catch(err => res.status(400).json({ err }));

        })
        .catch(err => res.status(400).json({ err }))
    }
}