import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
	state=>state
)
class Msg extends React.Component {
	getLast(arr){
		return arr[arr.length-1]
	}
	render() {
		const Item = List.Item
		const Brief = Item.Brief
		const userId = this.props.user._id
		const userInfo = this.props.chat.users
		// console.log(this.props.chat.chatmsg)
		const chatGroup = {}
		this.props.chat.chatmsg.map(v=>{
			chatGroup[v.chatid] = chatGroup[v.chatid] || []
			chatGroup[v.chatid].push(v)
		})

		const chatList = Object.values(chatGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			// console.log(a_last,b_last)
			return b_last - a_last
		})
		// console.log("aaaa",chatList)
		//按照聊天用户分组，根据chatid
		// console.log("aaaa",chatGroup)
		return(
			<div>
				{
					chatList.map(v=>{
						const lastItem = this.getLast(v)
						const targetId = v[0].from === userId?v[0].to:v[0].from
						const unreadNum = v.filter(v=>!v.read && v.to === userId).length
						return(
							<List key={lastItem._id}>
								<Item
									thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
									extra={<Badge text={unreadNum}></Badge>}
									arrow='horizontal'
									onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
								>
									{lastItem.content}
									<Brief>{userInfo[targetId].name}</Brief>
								</Item>
							</List>
						)
					})
				}
			</div>
		)
	}
}

export default Msg