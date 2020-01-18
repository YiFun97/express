// 引用express框架
const express = require('express')

//创建博客展示页面路由
const admin = express.Router()
//渲染登陆页面
admin.get('/login',require('./admin/loginpage'))
//实现登陆功能
admin.post('/login', require('./admin/login'))

//创建用户列表路由
admin.get('/user',require('./admin/userpage'))

//实现退出功能
admin.get('/logout' , require('./admin/logout'))

// 创建用户编辑页面功能
admin.get('/user-edit',require('./admin/user-edit'))
//创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'))

admin.post('/user-modify',require('./admin/user-modify'))
//删除用户路由
admin.get('/delete',require('./admin/user-delete'))

//文章列表页面路由
admin.get('/article',require('./admin/article'))
//文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'))

admin.post('/article-modify',require('./admin/article-modify'))
//实现文章添加路由
admin.post('/article-add',require('./admin/article-add'))
//删除用户路由
admin.get('/article-delete',require('./admin/article-delete'))
//将路由对象导出
module.exports = admin