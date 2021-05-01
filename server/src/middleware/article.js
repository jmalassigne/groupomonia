const jwtUtils = require('../utils/jwt.utils');
const models = require('../../models');

module.exports = {
    createArticle: (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const newArticle = { ...req.body };

        if (userId < 0) {
            return res.status(400).json({ error: "Invalid user" });
        }

        if (newArticle.title.length > 50 || newArticle.title.length < 5) {
            return res.status(400).json({ error: "Title must contains at least 5 characters and a maximum of 50" })
        }

        if (newArticle.content.length < 50) {
            return res.status(400).json({ error: "Article content must contains at least 50 characters" })
        }

        models.User.findOne({
            attributes: ['id'],
            where: { id: userId }
        })
            .then(userfound => {

                if (!userfound) {
                    return res.status(400).json({ error: 'Invalid user' });
                }

                models.Article.create({
                    title: newArticle.title,
                    content: newArticle.content,
                    UserId: userfound.id
                })
                    .then(() => res.status(201).json({ message: 'Article created successfuly' }))
                    .catch(err => res.status(500).json({ err }))

            })
            .catch(err => res.status(500).json({ err }))

    },
    listArticles: async (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const isUserAnAdmin = jwtUtils.getUserAdmin(headerAuth);
        const filter = req.query.filter;

        if (userId < 0) {
            return res.status(400).json({ error: "Invalid user" });
        }

        let dataToSend = {};

        //Collecting articles to send

        const articlesToSend = await models.Article.findAll({
            attributes: ['id', 'userId', 'title', 'content', 'createdAt']
        })
            .then(articlesFound => {

                if (articlesFound.length < 1) {
                    return res.status(404).json({ error: 'No articles found' });
                }

                const articles = [];

                articlesFound.forEach(article => {

                    const currentContentOfArticle = article.dataValues.content;
                    const newContentOfArticle = currentContentOfArticle.substr(0, 250);
                    article.dataValues.content = newContentOfArticle + '...';

                    article.dataValues.numberOfComments = 0;
                    article.dataValues.numberOfLikes = 0;
                    article.dataValues.numberOfDislikes = 0;

                    if (article.dataValues.userId === userId) {
                        article.dataValues.userCanDelete = true;
                    } else {

                        if (isUserAnAdmin === true) {
                            article.dataValues.userCanDelete = true
                        } else {
                            article.dataValues.userCanDelete = false;
                        }
                    }



                    articles.push(article.dataValues);

                });

                return articles;

            })
            .catch(err => res.status(500).json({ err }));


        const usersIdToFind = [];
        const articlesIdToFind = [];

        articlesToSend.forEach(article => {
            articlesIdToFind.push(article.id);
            usersIdToFind.push(article.userId);
        });



        const usersToSend = await models.User.findAll({
            attributes: ['username', 'id'],
            where: { id: usersIdToFind }
        })
            .then(usersFound => {

                if (usersFound.length < 1) {
                    return null;
                }

                let users = [];

                usersFound.forEach(user => {
                    users.push({ id: user.dataValues.id, username: user.dataValues.username });
                });

                return users;

            })
            .catch(err => res.status(500).json({ err }));



        const commentsToSend = await models.Comment.findAll({
            attributes: ['articleId'],
            where: { articleId: articlesIdToFind }
        })
            .then(commentsFound => {

                if (commentsFound.length < 1) {
                    return null;
                }

                const comments = [];

                commentsFound.forEach(comment => {
                    comments.push(comment.dataValues);
                });

                return comments;

            })
            .catch(err => res.status(500).json({ err }));


        const likesToSend = await models.Like.findAll({
            attributes: ['articleId', 'value'],
            where: { articleId: articlesIdToFind }
        })
            .then(likesFound => {

                if (likesFound.length < 1) {
                    return null;
                }

                const likes = [];

                likesFound.forEach(like => {
                    likes.push(like.dataValues);
                });

                return likes;

            })
            .catch(err => res.status(500).json({ err }));



        //Adding users to articles


        if (usersToSend != null) {

            usersToSend.forEach(user => {

                articlesToSend.forEach(article => {

                    if (article.userId === user.id) {

                        article.author = user.username;
                        delete article.userId;

                    }

                })

            })

        }

        //Adding number of comments to articles

        if (commentsToSend != null) {

            commentsToSend.forEach(comment => {

                articlesToSend.forEach(article => {

                    if (article.id === comment.articleId) {

                        let currentNumberOfComments = article.numberOfComments;
                        currentNumberOfComments++;
                        article.numberOfComments = currentNumberOfComments;

                    }

                });

            });


        }

        //Adding number of likes to articles 

        if (likesToSend != null) {

            likesToSend.forEach(like => {

                articlesToSend.forEach(article => {

                    if (article.id === like.articleId) {

                        if (like.value === false) {

                            let currentNumberOfDislikes = article.numberOfDislikes;
                            currentNumberOfDislikes++;
                            article.numberOfDislikes = currentNumberOfDislikes;

                        }

                        if (like.value === true) {

                            let currentNumberOfLikes = article.numberOfLikes;
                            currentNumberOfLikes++;
                            article.numberOfLikes = currentNumberOfLikes;

                        }

                    }

                })

            })

        }


        //filter articlesToSend

        if (filter === 'recents') {

            articlesToSend.sort((a, b) => {
                var keyA = new Date(a.createdAt),
                    keyB = new Date(b.createdAt);
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });

        }

        if (filter === 'commented') {

            articlesToSend.sort((a, b) => {
                var keyA = a.numberOfComments,
                    keyB = b.numberOfComments;
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });

        }

        if (filter === 'liked') {

            articlesToSend.sort((a, b) => {
                var keyA = a.numberOfLikes,
                    keyB = b.numberOfLikes;
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });

        }

        dataToSend.articles = articlesToSend;

        res.status(200).json(dataToSend);

    },
    findArticle: async (req, res) => {

        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const isUserAnAdmin = jwtUtils.getUserAdmin(headerAuth);
        const articleId = req.query.id;

        let dataToSend = {};

        if (userId < 0) {
            return res.status(404).json({ error: "Invalid user" });
        }

        if (!articleId) {
            return res.status(400).json({ error: "missing parameters" })
        }

        const articleToSend = await models.Article.findOne({
            attributes: ['title', 'content', 'createdAt', 'userId'],
            where: { id: articleId }
        })
            .catch(err => res.status(500).json({ err }));

        const idOfArticleCreator = articleToSend.dataValues.userId;

        const usernameOfCreator = await models.User.findOne({
            attributes: ['username'],
            where: { id: idOfArticleCreator }
        })
            .catch(err => res.status(500).json({ err }));

        articleToSend.dataValues.author = usernameOfCreator;
        delete articleToSend.dataValues.userId;





        const commentsToSend = await models.Comment.findAll({
            attributes: ['content', 'createdAt', 'userId', 'id'],
            where: { articleId: articleId }
        })
            .then(commentsFound => {
                if (commentsFound.length < 1) {
                    return null;
                } else {

                    return commentsFound;

                }
            })
            .catch(err => res.status(500).json({ err }));



        const idsOfCreatorsOfComments = [];

        if (commentsToSend != null) {
            commentsToSend.forEach(comment => {
                idsOfCreatorsOfComments.push(comment.userId)
            })
        }

        if (idsOfCreatorsOfComments.length > 0) {
            commentsToSend.forEach(comment => {
                idsOfCreatorsOfComments.push(comment.userId);
            })
        }


        const usernameOfCreatorOfComments = await models.User.findAll({
            attributes: ['username', 'id'],
            where: { id: idsOfCreatorsOfComments }
        })
            .catch(err => res.status(500).json({ err }));




        if (commentsToSend != null) {
            commentsToSend.forEach(comment => {
                const idOfCreatorOfComment = comment.userId;

                if(comment.dataValues.userId === userId || isUserAnAdmin){
                    comment.dataValues.userCanDelete = true;
                } else {
                    comment.dataValues.userCanDelete = false;
                }

                usernameOfCreatorOfComments.forEach(username => {

                    if (username.id === idOfCreatorOfComment) {

                        comment.dataValues.author = username.username;
                        delete comment.dataValues.userId;
                    }

                })

            })
        }



        const likesToSend = await models.Like.findAll({
            attributes: ['value', 'userId'],
            where: { articleId: articleId }
        }).then(likesFound => {

            if (likesFound.length <= 0) {
                return null;
            }


            let likes = {
                likes: 0,
                dislikes: 0,
                userLike: -1
            };


            likesFound.forEach(like => {

                if (like.value === false) {

                    let currentNumberOfDislikes = likes.dislikes;
                    currentNumberOfDislikes++;
                    likes.dislikes = currentNumberOfDislikes;

                } else {

                    let currentNumberOfLikes = likes.likes;
                    currentNumberOfLikes++;
                    likes.likes = currentNumberOfLikes;

                }

            });


            likesFound.forEach(like => {

                if (like.userId === userId) {

                    if (like.value === true) {
                        likes.userLike = 1;
                    } else {
                        likes.userLike = 0;
                    }

                }

            })



            return likes;

        })
            .catch(err => res.status(500).json({ err }));




        dataToSend.article = articleToSend;

        if (commentsToSend != null) {
            dataToSend.comments = commentsToSend;
        }

        if (likesToSend != null) {
            dataToSend.likes = likesToSend;
        }



        res.json(dataToSend);


    },
    deleteArticle: (req, res) => {

        const articleId = req.query.id;

        models.Like.destroy({
            where: {articleId: articleId}
        })
        .catch(err => res.status(500).json({ err }));

        models.Comment.destroy({
            where: {articleId: articleId}
        })
        .catch(err => res.status(500).json({ err }));


        models.Article.destroy({
            where: {id: articleId}
        })
        .then(() => res.status(200).json({message: "Article deleted successfully"}))
        .catch(err => res.status(500).json({ err }));

    }
}