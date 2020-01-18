const  Joi =  require('joi')
const mongoose = require('mongoose')
//创建用户集合规则
const userSchema = new  mongoose.Schema({
    username:{
        type:String ,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        unique:true,//保证邮箱地址不重复
    },
    password:{
        type:String,
        required:true,

    },
    //admin 超级管理员
    //普通用户
    role:{
        type:String,
        required:true,
    },
    //0启用,1禁用
    state:{
        type:Number,
        default:0
    }

})
//创建集合
 const User =  mongoose.model('User',userSchema)
 //定义验证规则
const validateUser = user =>{
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email:Joi.string().email().required().error(new Error('邮箱规则不符')),
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符')),
        role:Joi.string().valid('normal','admin').required().error(new Error('角色值错误')),
        state:Joi.number().valid(0,1).required().error(new Error('状态值非法')),
    }

   return Joi.validate(user,schema)
}
 module.exports = {
     User,
     validateUser
}
