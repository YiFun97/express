const{Comment} = require('../../model/comment')
module.exports = async (req,res) => {
    //接受客户端传来的信息
  const {content,uid,aid} = req.body
    //将评论信息存到评论集合中
   await Comment.create({
        content:content,
        uid:uid,
        aid:aid,
        time:new Date()
    })

    res.redirect('/home/article?id='+ aid)
}