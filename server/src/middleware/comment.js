const jwtUtils = require('../utils/jwt.utils');
const models = require('../../models');

module.exports = {
    createComment: (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const articleId = req.query.id;
        const content = req.body.content;

        if(userId < 0){
            return res.status(401).json({error: "Invalid user"});
        }

        if(content.length > 200){
            return res.status(400).json({error: "Comment must contains less than 200 characters"})
        }

        models.Comment.create({
            articleId: articleId,
            userId: userId,
            content: content
        })
            .then(() => res.status(201).json({messsage: "Comment created successfully"}))
            .catch(err => res.status(500).json({ err }))

    },
    deleteComment: async (req, res) => {
        const commentId = req.query.id;
        
        const comment = await models.Comment.findOne({
            where: {id: commentId}
        })
        .catch(err => {
            return res.status(500).json({ err })
        });

        if(comment != null){
            
            models.Comment.destroy({
                where: {id: commentId}
            })
            .then(() => res.status(200).json({message: 'Comment deleted succesfully'}))
            .catch(err => res.status(500).json({err}))

        } else {
            return res.status(400).json({error: 'Comment does not exist'})
        }
    }  
}