import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Radio, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { regisger } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
	state=>state.user,
	{regisger}
)

@imoocForm

class Register extends React.Component{
	constructor(props){
		super(props)
		// this.state = {
		// 	type: 'genius',
		// 	user: '',
		// 	pwd: '',
		// 	repeatpwd: ''
		// }
		this.handleRegiter = this.handleRegiter.bind(this)
	}
	componentDidMount() {
		this.props.handleChange('type','genius')
	}
	// handleChange(key, val){
	// 	this.setState({
	// 		[key]: val
	// 	})
	// }
	handleRegiter(){
		// this.props.regisger(this.state)
		this.props.regisger(this.props.state)
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				<WhiteSpace />
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
				<Logo />
				<WingBlank>
					<List>
						{
							this.props.msg?<p>{this.props.msg}</p>:null
						}
						<InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
						<InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
						<InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
						<RadioItem checked={this.props.state.type === 'genius'} onChange={()=>this.props.handleChange('type','genius')}>牛人</RadioItem>
						<RadioItem checked={this.props.state.type === 'boss'} onChange={()=>this.props.handleChange('type','boss')}>boss</RadioItem>
					</List>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegiter}>注册</Button>
				</WingBlank>

			</div>
		)
	}
}

export default Register