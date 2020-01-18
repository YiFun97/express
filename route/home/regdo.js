

const  {User,validateUser} = require('../../model/user')

module.exports = async(req,res,next) =>{
    //实施验证
    try{
        await validateUser(req.body)
    }catch(e){
        //重定向回用户添加页面
        // return   res.redirect(`/admin/user-edit?message=${e.message}`)
        //JSON.stringify() 将对象数据类型转换成字符串数据类型
         return  next(JSON.stringify({path:'/home/reg',message:e.message}))
    }
    //根据邮箱地址查询是否有用户信息
     let user = await User.findOne({email:req.body.email})
     //如果有用户信息 则返回 邮箱地址被占用
     if(user){
    //    return  res.redirect(`/admin/user-edit?message=邮箱地址被占用`)
    // return  next(JSON.stringify({path:'/home/reg',message:'邮箱地址被占用'}))
    return res.status(400).render('home/reg',{message:'邮箱地址被占用'})
     }
     //将用户信息添加到数据库中
    await  User.create(req.body)
    //将页面重定向到用户列表页面
    // res.redirect('/admin/login')
    res.render('admin/regsuc',{message:'注册成功'})
}