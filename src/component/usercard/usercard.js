import React from 'react'
import { Card, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
	handleChange(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render() {
		return(
			<div>
				<WhiteSpace size="lg" />
				{
					this.props.userlist.map((v)=>(
						v.avatar?
						<Card 
							full key={v._id}
							onClick={()=> this.handleChange(v)}
							>
					      	<Card.Header
						        title={v.user}
						        thumb={require(`../img/${v.avatar}.png`)}
						        extra={<span>{v.title}</span>}
					      	/>
						    <Card.Body>
						      	{
						      		v.type === 'boss'? <div>公司名称：{v.company}</div>:null
						      	}
						        <div>{v.desc}</div>
						        {
						        	v.type === 'boss'? <div>薪资：{v.money}</div>:null
						      	}
					        </Card.Body>
					    </Card>:null
					))
				}

			</div>
		)
	}
}

export default UserCard