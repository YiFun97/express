module.exports = (req,res) => {
    //渲染模板页面 app.js定义后这里才能接受 admin/login就是views下面的admin目录的login.art
    res.render('admin/login')
}