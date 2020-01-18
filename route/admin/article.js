const {Article} = require('../../model/article')

const pagination = require('mongoose-sex-page')
module.exports = async(req, res) => {
   const  page = req.query.page
   let count = await Article.countDocuments({})
    req.app.locals.currentLink = 'article' //标识，表示当前访问的是文章管理页面
//page 指定当前页 size每页数据显示条数 display指定客户端要显示的页码数量
    let articles =  await pagination(Article).find().page(page).size(6).display(4).populate('author').exec()
   
    res.render('admin/article.art',{
        articles:articles,
        count:count
    })
}