const mongoose = require('mongoose')
//连接mongo
const DB_URL = 'mongodb://lixinfei:lixinfei@172.18.3.125:27017/lixinfeidb'
//const DB_URL = 'mongodb://lixinfei:lixinfei@192.168.244.130:27017/lixinfeidb'
mongoose.connect(DB_URL)

// const User = mongoose.model('user', new mongoose.Schema({
// 	user:{type:String, require:true},
// 	age:{type:Number,require:true}
// }))


const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}
	},
	chat:{
		'chatid': {'type': String, 'require':true},
		'from': {'type': String, 'require': true},
		'to': {'type': String, 'require': true},
		'read': { 'type': Boolean, 'default': false},
		'content': { 'type': String, 'require': true, 'default':''},
		'create_time': {type:Number, default:new Date().getTime()}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}