// 引用express框架
const express = require('express')

//创建博客展示页面路由
const home = express.Router()

home.get('/reg',require('./home/reg'))
home.post('/regdo',require('./home/regdo'))
//博客前台首页展示页面
home.get('/',require('./home/index'))

//博客前台详情展示页面
home.get('/article',require('./home/article'))
//创建评论功能路由
home.post('/comment',require('./home/comment'))

//实现退出功能
home.get('/logout' , require('./home/logout'))
//将路由对象导出
module.exports = home