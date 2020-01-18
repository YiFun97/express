//该文件为文章详情页面对应的路由请求处理函数

const  {Article}=  require('../../model/article')
const {Comment} = require('../../model/comment') 
module.exports = async (req,res) => {
     const id  = req.query.id
    //根据Id查询文章详情信息
     let article =  await Article.findOne({_id:id}).populate('author')
     //查询文章所对应的评论信息
     let comments =  await Comment.find({aid:id}).populate('uid')

    res.render('home/article.art',{article,comments})
}