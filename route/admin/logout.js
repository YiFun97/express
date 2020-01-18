module.exports = (req,res) => {
    //删除session
    req.session.destroy(function(){
         //删除cookie
         res.clearCookie('connect.sid')
             //重定向用户登录页面
             res.redirect('/admin/login')
             //清除模板中用户信息
             req.app.locals.userInfo = null
    })
   

}