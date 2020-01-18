// 引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
 const {Article} = require('../../model/article')
module.exports  = (req,res) => {
    // 1.创建表单解析对象
	const form = new formidable.IncomingForm();
	const id  = req.query.id
	// 2.配置上传文件的存放位置
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
	// 3.保留上传文件的后缀
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
		// 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
		// 2.fields 对象类型 保存普通表单数据
		// 3.files 对象类型 保存了和上传文件相关的数据
		// res.send(files.cover.path.split('public')[1])
		await Article.updateOne({_id:id},{
			title: fields.title,
			author: fields.author,
			publishDate: fields.publishDate,
			cover: files.cover.path.split('public')[1],
			content: fields.content,
		});
		// 将页面重定向到文章列表页面
		res.redirect('/admin/article');
	})
}



// const  {User}= require('../../model/user')
// const {Article} = require('../../model/article')
// module.exports = async(req,res,next) => {
//         //接受客户端传来的参数
//         const {username,email,role,state,password} = req.body
//          //即将要修改的用户Id
//         const id  = req.query.id //文章id
//         //  let userId =  await Article.findOne({_id:id}).populate('author')
//         //            console.log(userId)
//         // let user = await User.findOne({_id:id})
//         // if(password == user.password){

//         //     //  await User.updateOne({_id:id},{
//         //     //     username :username,
//         //     //     email :email,
//         //     //     role :role,
//         //     //     state :state
//         //     // })
//         //     // //重定向用户列表页面
//         //     // res.redirect('/admin/user')
//         // }else{
//         //     let obj = {path:'/admin/article-edit',message:'密码比对失败，不能修改',id:id}
//         //     next(JSON.stringify(obj))
//         // }
    

// }