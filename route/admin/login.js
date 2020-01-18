//导入用户集合构造函数
const {User} = require('../../model/user')

module.exports  =   async (req,res) =>{
    const {email ,password} = req.body
    if(email.trim().length == 0 || password.trim().length == 0){
       return  res.status(400).render('admin/error',{msg:'邮件地址或密码错误'})  //阻止向下运行
     }
     //根据邮箱地址查询用户信息
     //如果查询到了用户,变量是对象类型 对象中存储 的是用户信息
     //如果没有查到 user变量为空    
    let user =  await User.findOne({email})   
    if(user){
        //将客户端传递的密码和用户信息比对
        if(password == user.password){
            //将用户名存储在session请求对象中
            req.session.username = user.username
            //将用户权限存在session
            req.session.role = user.role
            req.app.locals.userInfo = user
            if(user.role =='admin'){    
                   res.redirect('/admin/user')//重定向到管理用户列表页面
            }else{
                res.redirect('/home/') //博客首页
            }
         
        }else{
            res.status(400).render('admin/error',{msg:'邮件地址或密码错误'})
        }
    }else{
        res.status(400).render('admin/error',{msg:'邮件地址或密码错误'})
    }

}

