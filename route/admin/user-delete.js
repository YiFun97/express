const {User} = require('../../model/user')
module.exports =  async(req,res) =>{
        // req.query根据ID删除用户
      await User.findOneAndDelete({_id:req.query.id})

      res.redirect('/admin/user')
}