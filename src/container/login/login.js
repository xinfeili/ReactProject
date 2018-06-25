import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
@connect(
	state=>state.user,
	{login}
)
@imoocForm
class Login extends React.Component{
	constructor(props){
		super(props);
		// this.state = {
		// 	user: '',
		// 	pwd: ''
		// }
		this.handleLogin = this.handleLogin.bind(this)
		this.register = this.register.bind(this)
	}
	// hanldChange(key,val) {
	// 	this.setState({
	// 		[key]:val
	// 	})
	// }
	handleLogin() {
		this.props.login(this.props.state)
	}
	register() {
		this.props.history.push('/register')
	}
	render(){
		return (
			<div>
				<WhiteSpace />
				{(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} />: null}
				<Logo />
				<WhiteSpace />
				<WingBlank>
					<List>
						{
							this.props.msg?<p>{this.props.msg}</p>:null
						}
						<InputItem onChange={v=> this.props.handleChange("user",v)}>用户</InputItem>
						<WhiteSpace />
						<InputItem type="password" onChange={v=> this.props.handleChange("pwd",v)}>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleLogin}>登录</Button>
					<WhiteSpace />
					<Button type='primary' onClick={this.register}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login