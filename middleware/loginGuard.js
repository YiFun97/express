
const guard =  (req,res,next) => {
    //判断用户访问的是否是登陆页面
    //判断用户登录状态
    //如果用户是登陆的将请求放行
    // 如果用户不是登陆的将请求重定向登陆页面
    if(req.url !='/login' && !req.session.username){
        res.redirect('/admin/login')
    } else{
        //是登陆状态并且是普通用户
        if(req.session.role == 'normal'){
            //跳转到博客首页，阻止程序向下执行
              return  res.redirect('/home/')
        }else{
            //用户是登陆的将请求放行
        next()
    }
    }
}

module.exports = guard