const jwtUtils = require('../utils/jwt.utils');
const models = require('../../models');

module.exports = {
    createArticle: (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const newArticle = {...req.body};

        if(userId < 0){
            return res.status(400).json({error: "Invalid user"});
        }

        if(newArticle.title.length > 50 || newArticle.title.length < 5){
            return res.status(400).json({error: "Title must contains at least 5 characters and a maximum of 50"})
        }

        if(newArticle.content.length < 50){
            return res.status(400).json({ error: "Article content must contains at least 50 characters"})
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
    listArticles: async (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0){
            return res.status(400).json({error: "Invalid user"});
        }

        let dataToSend = {};

        //Collecting articles to send
        const articlesToSend = await models.Article.findAll({
            attributes: ['id', 'userId', 'title', 'content', 'createdAt'],
            
        })
        .then(articlesFound => {
            if(articlesFound.length < 1){
                return res.status(404).json({error: 'No articles found'});
            }
            const articles = [];
            articlesFound.forEach(article => {
                articles.push(article.dataValues);
            })
            return articles;
        })
        .catch(err => res.status(500).json({ err }));

        //Collecting comments to send
        let articlesIdToFind = [];

        articlesToSend.forEach(article => {
            articlesIdToFind.push(article.id);
        });

       const commentsToSend = await models.Comment.findAll({
           attributes: ['articleId', 'userId', 'content', 'createdAt'],
           where: {articleId: articlesIdToFind}
       })
       .then(commentsFound => {
           if(commentsFound.length < 1){
               return null;
           }
           let comments = [];
           commentsFound.forEach(comment => {
               comments.push(comment.dataValues);
           });
           return comments;
       })
       .catch(err => res.status(500).json({ err }));

        //Collecting likes to send
        const likesToSend = await models.Like.findAll({
            attributes: ['articleId', 'userId', 'value'],
            where: {articleId: articlesIdToFind}
        })
        .then(likesFound => {
            if(likesFound.length < 1){
                return null;
            }
            let likes = [];
            likesFound.forEach(like => {
                likes.push(like.dataValues);
            });
            return likes;
        })
        .catch(err => res.status(500).json({ err }));
        
        //Adding comments to relatived article
        if(commentsToSend != null ){

            articlesToSend.forEach(article => {
                let commentsRelativeToArticle = [];
                commentsToSend.forEach(comment => {
                    if(comment.articleId === article.id){
                        commentsRelativeToArticle.push(comment);
                    }
                });
                article.comments = commentsRelativeToArticle;
            });

        }

        //Adding likes to relatived article
        if(likesToSend != null) {

            articlesToSend.forEach(article => {
                let likesRelativeToArticle = [];
                likesToSend.forEach(like => {
                    if(like.articleId === article.id){
                        likesRelativeToArticle.push(like);
                    }
                });
                article.likes = likesRelativeToArticle;
            });

        }

        //Adding articles to articlesToSend
        dataToSend.articles = articlesToSend;

        res.status(200).json(dataToSend);

    },
    findArticle: async (req, res) => {

        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const articleId = req.query.id;

        let dataToSend = {};

        if(userId < 0){
                 return res.status(404).json({error: "Invalid user"});
             }

        if(!articleId){
                return res.status(400).json({error: "missing parameters"})
            }

         const articleToSend = await models.Article.findOne({
             attributes: ['title', 'content', 'createdAt','userId'],
             where: {id: articleId}
         })
         .catch(err => res.status(500).json({ err }));

        const idOfArticleCreator = articleToSend.dataValues.userId;

        const usernameOfCreator = await models.User.findOne({
             attributes: ['username'],
             where: {id: idOfArticleCreator}
         })
         .catch(err => res.status(500).json({ err }));

         articleToSend.dataValues.author = usernameOfCreator;
         delete articleToSend.dataValues.userId;
         

        


        const commentsToSend = await models.Comment.findAll({
             attributes: ['content', 'createdAt', 'userId'],
             where: {articleId: articleId}
         })
         .then(commentsFound => {
             if(commentsFound.length < 1){
                 return null;
             } else {
                 
                return commentsFound;

             }
         })
         .catch(err => res.status(500).json({ err }));


         
        const idsOfCreatorsOfComments = [];

        commentsToSend.forEach(comment => {
            idsOfCreatorsOfComments.push(comment.userId)
        })

        if(idsOfCreatorsOfComments.length > 0) {
            commentsToSend.forEach(comment => {
                idsOfCreatorsOfComments.push(comment.userId);
            })
        }


        const usernameOfCreatorOfComments = await models.User.findAll({
            attributes: ['username', 'id'],
            where: {id: idsOfCreatorsOfComments}
        })
        .catch(err => res.status(500).json({ err }));


       
        commentsToSend.forEach(comment => {
            const idOfCreatorOfComment = comment.userId;
            
            usernameOfCreatorOfComments.forEach(username => {

                if(username.id === idOfCreatorOfComment){
                    
                    comment.dataValues.author = username.username;
                    delete comment.dataValues.userId;
                }

            })

        })
         


        

        const likesToSend = await models.Like.findAll({
            attributes: ['value', 'userId'],
            where: {articleId: articleId}
        })
        .then(likesFound => {
            let likes = {
                like: 0,
                dislike: 0
            };
            let userLike = {};

            if(likesFound.length < 1){
                return null;
            }

            likesFound.forEach(like => {
                if(like.userId === userId){
                    userLike.value = like.value;
                    likes.userLike = userLike;
                } 

                let currentNumberOfLikes = likes.like;
                let currentNumberOfDislikes = likes.dislike;

                if(like.value === false){
                    currentNumberOfDislikes++;
                    likes.dislike = currentNumberOfDislikes;
                } else {
                    currentNumberOfLikes++;
                    likes.like = currentNumberOfLikes;
                }

            });

            return likes;

        })
        .catch(err => res.status(500).json({ err }))


        dataToSend.article = articleToSend;

         if(commentsToSend != null){
             dataToSend.comments = commentsToSend;
        }

        if(likesToSend != null){
            dataToSend.likes = likesToSend;
        }
        


        res.json(dataToSend);
        

    },
    deleteArticle: (req, res) => {
       
    }
}