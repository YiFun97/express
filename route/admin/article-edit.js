const {Article} = require('../../model/article')
const{User}  = require('../../model/user')
module.exports = async(req, res) => {
    // res.render('admin/article-edit.art')
     //获取地址栏id参数
     const {message,id}= req.query
     //如果当前传递了id参数 
     if(id){
         // 则为修改操作
        let article =   await Article.findOne({_id:id}).populate('author')
        let user =   await User.findOne({_id:id})
        //渲染用户编辑页面(修改)
        res.render('admin/article-edit',{
      
         article:article,
         user:user,
         link:'/admin/article-modify?id=' + id,
         button:'修改'
     })
     } else{//添加操作
         res.render('admin/article-edit',{
       
            
             link:'/admin/article-add',
             button:'添加'
 
         })
     }
}