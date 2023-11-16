const articleModel = require("../models/articleModel")
const commentModel = require("../models/commentModel")

module.exports = {
    
    post: async (req, res) => {
        const article = await articleModel. findById(req.params._id)
        await commentModel.create({
            author : req.session.userId,
            content: req.body.comment,
            article :article._id
        })
        
        res.redirect('back')
    }
}