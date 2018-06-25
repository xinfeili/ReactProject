import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'

@connect(
	state=>state.user,
	{logoutSubmit}
)

class User extends React.Component {
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
	logout(){
		const alert = Modal.alert
		alert('注销', '确认退出吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
            	browserCookie.erase("userid")
            	this.props.logoutSubmit()
            	// window.location.href = window.location.href
            	}
      		}
        ])
	}
	render() {
		// console.log(this.props)
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return props.user?(
			<div>
				<Result
					img={<img src={require(`../img/${props.avatar}.png`)} alt="" />}
				    title={props.user}
				    message={props.type === "boss"?<div>{props.company}</div>:null}
				/>
				    <WhiteSpace />
				    <List renderHeader={()=>'简介'}>
					  	<Item multipleLine>
					  		<p>{props.title}</p>
					  		<div><Brief>{props.desc}</Brief></div>
					  		{props.money?<Brief>{props.money}</Brief>:null}
					  	</Item>
				    </List>
				    <WhiteSpace />
					<List>
						<Item onClick={this.logout}>退出登录</Item>
					</List>
			</div>
		):<Redirect to={props.redirectTo}></Redirect>
	}
}

export default User