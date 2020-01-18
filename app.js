// 引用express框架
const express = require('express')
//处理路径
const path = require('path')
//引入body-parser模块 用来处理Post请求参数
const bodyParser = require('body-parser')
//导入session模块
const session = require('express-session')
// 导入art-tempate模板引擎
const template = require('art-template');
const dateFormat = require('dateformat')
const morgan = require('morgan')
const config = require('config')
//创建网站服务器
const app = express()
//数据库连接
require('./model/connect')
//处理Post请求参数
app.use(bodyParser.urlencoded({extended:false}))
//配置session
app.use(session({
            secret:'secret key',
            saveUninitialized:false,
            cookie:{
                maxAge:24 * 60 * 60 * 1000 
            }

}))

//告诉express框架模板所在位置
app.set('views',path.join(__dirname,'views'))
//告诉express框架模板的默认后缀
app.set('view engine','art')
//当渲染后缀为art模板时,所使用的模板引擎是什么
app.engine('art',require('express-art-template'))
//向模板内部导入Dateformat变量
template.defaults.imports.dateFormat = dateFormat
//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')))




//获取系统环境变量  返回值是对象    
if(process.env.NODE_ENV == 'development'){
    console.log('开发环境')
    app.use(morgan('dev'))
}else{
    console.log('生产环境')
}




//导入路由模块
const admin = require('./route/admin')
const home = require('./route/home')

//拦截请求
app.use('/admin',require('./middleware/loginGuard'))

//如果路径是/home  则去找home 路由 (为路由匹配路径)
app.use('/home',home)
app.use('/admin',admin)

app.use((err,req,res,next) => {
    const result = JSON.parse(err) 
    // res.redirect(`${result.path}?message=${result.message}`)
    let params = [];
	for (let attr in result) {
		if (attr != 'path') {
			params.push(attr + '=' + result[attr]);
		}
	}
	res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(80)
console.log('网站服务器启动成功')