const  {Article}=  require('../../model/article')
const pagination = require('mongoose-sex-page') 
module.exports = async (req,res) =>{

     const  page = req.query.page
    //数据库中查询数据
     let  result = await pagination(Article).page(page).size(4).display(4).find().populate('author').exec()
     //渲染模板
    res.render('home/default',{
        result:result
    })
}
