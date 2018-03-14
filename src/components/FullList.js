import React from 'react'
import axios from '../axioslog.js'
import {withRouter, NavLink} from 'react-router-dom'
import Search from './Search'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/styles/hljs'

import './css/Entry.css';

class FullList extends React.Component {
    state = {
        posts: [],
        rendered: [],
    }

    textValueChange = (value) => {
        if (value){
            var postFiltered = this.state.posts.filter(post=>
                post.post.toLowerCase().includes(value.toLowerCase()) ||
                post.date.toLowerCase().includes(value.toLowerCase())
            )
            this.setState({rendered:postFiltered})
        } else {
            this.setState({rendered: this.state.posts})
        }
    }

    componentDidMount(){    
        axios.get('/log.json').then(response=>{
            let postList = []
            for(let k in response.data){
                postList.push({...response.data[k], id: k})
            }
            let reversed = postList.reverse()
            this.setState({posts: reversed, rendered: reversed})
        })
    }
    linkHandler = (id) => {
        this.props.history.push(`/${id}`)
    }
    homeHandler (){
        this.props.history.push('/')
    }
    fullHandler (){
        this.props.history.push('/full')
    }

    render () {
       return  (
        <div>
            <button className="hvr-fade" onClick={this.fullHandler.bind(this)}>VIEW FULL LIST</button>
            <button className="hvr-fade" onClick={this.homeHandler.bind(this)}>HOME</button>
            <Search change={this.textValueChange}/>
                {this.state.rendered.map(post=>(
                    <div className="hvr-border-fade" onClick={()=>this.linkHandler(post.id)} key={post.id}>
                        <div className='inner-div'>
                            <NavLink className='ListLink' to={`/${post.id}`}>{post.date.toUpperCase()}</NavLink>
                            {post.hasCode ? 
                                <SyntaxHighlighter 
                                    className="code-list" 
                                    language='javascript' 
                                    style={dark}>{post.post.slice(post.post.indexOf('<code>')+7, post.post.indexOf('</code>'))}
                                </SyntaxHighlighter> :
                                post.post.length > 500 ? <p>{post.post.slice(0,500)+'...'}</p> : <p>{post.post}</p>
                            }
                        </div>
                    </div>
                    
                ))}
            </div>
        )
    }
}

export default withRouter(FullList)