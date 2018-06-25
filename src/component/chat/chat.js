import React from 'react'
import io from 'socket.io-client'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
// const socket = io('ws://localhost:9093')

@connect(
	state=>state,
	{ getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			text: '',
			msg: []
		}
	}
	hanldeSubmit() {
		// socket.emit('sendmsg',{text:this.state.text})
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		// console.log(from, to, msg)
		this.props.sendMsg({from, to, msg})
		this.setState({
			text: '',
			showemoji: false
		})
	}
	componentDidMount() {
		if(!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
		// socket.on('recvmsg', data=>{
		// 	this.setState({
		// 		msg: [...this.state.msg, data.text]
		// 	})
		// 	// console.log(data)
		// })
	}
	componentWillUnmount() {
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
	fixCarousel() {
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	render() {
		// console.log(this.props)
		const emoji = '😃 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😎 😍 😘 😗 😙 🤔 😐 🙄 😏 😥 😫 😝 😒 🤤 🙈 🙉 🐶 🐺 🐱 🤑 😲 😩 😠 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ').filter(v=>v).map(v=>({text:v}))
		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		// console.log(users)
		// console.log(this.props.chat.chatmsg)
		if(!users[userid]){
			return null
		}
		const chatId = getChatId(userid, this.props.user._id)
		const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid === chatId)
		return(
			<div id="chat-page">
				<NavBar
					mode='dark'
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>
					{users[userid].name}
				</NavBar>
				{
					chatmsg.map(v=>{
						const avatar = require(`../img/${users[v.from].avatar}.png`)
						return v.from === userid? (
							<List key={v._id}>
								<Item
									thumb= {avatar}
								>
									{v.content}
								</Item>
							</List>
						):(
							<List key={v._id}>
								<Item
									className="chat-me"
									extra={<img src={avatar} />}
								>{v.content}</Item>
							</List>
						)
					})
				}
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={(v)=> this.setState({text:v})}
							extra={
								<div>
									<span
										onClick={()=>{
											this.setState({
												showemoji:!this.state.showemoji
											})
											this.fixCarousel()
										}}
										style={{marginRight:10}}
									>😃</span>
									<span onClick={()=>this.hanldeSubmit()}>发送</span>
								</div>
							}
						>

						</InputItem>
					</List>
					{
						this.state.showemoji?
						<Grid data={emoji} columnNum={9} isCarousel carouselMaxRow={3} onClick={(el)=>{this.setState({text:this.state.text+el.text})}} />:null
					}
				</div>
			</div>
		)
	}
}

export default Chat