 //导入用户集合构造函数
 const{User}  = require('../../model/user')
 module.exports = async (req,res) => {
    req.app.locals.currentLink = 'user' //标识，表示当前访问用户管理页面

     //接受客户端传来的当前页参数
    let page = req.query.page ||1
    let pagesize = 10//每一页显示的数据条数
    //查询用户数据总数
    let count = await User.countDocuments({})
    //总页数 向上取整
    let total = Math.ceil(count / pagesize) 
    //页码对应的数据查询开始位置
    let start = (page - 1 ) * pagesize
     //将用户信息从数据库查询出来
     let users = await User.find({}).limit(pagesize).skip(start)

    res.render('admin/user',{
        users:users,
        page:page,
        count:count,
        total:total
    })
}