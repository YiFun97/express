const {Article} = require('../../model/article')
module.exports =  async(req,res) =>{
        // req.query根据ID删除用户
      await Article.findOneAndDelete({_id:req.query.id})

      res.redirect('/admin/article')
}