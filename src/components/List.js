import React from 'react'
import axios from '../axioslog.js'
import { NavLink, withRouter } from 'react-router-dom'
import './css/List.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/styles/hljs'

import Search from './Search';

class List extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            posts: [],
            rendered: [],
            topFive: [],
        }
    }

    textValueChange = (value) => {
        if (value){
            var postFiltered = this.state.posts.filter(post=>
                post.post.toLowerCase().includes(value.toLowerCase()) ||
                post.date.toLowerCase().includes(value.toLowerCase())
            )
            this.setState({rendered: postFiltered})
        } else {
            this.setState({rendered: this.state.topFive})
        }
    }
    
componentDidMount(){    
    axios.get('/log.json').then(response=>{
        let postList = []
        for(let k in response.data){
            postList.push({...response.data[k], id: k})
        }
        let postLength = postList.length
        if (postLength >5) {
            let topFive = postList.slice(postLength-5, postLength).reverse()
            this.setState({posts: postList, rendered: topFive, topFive })
        } else {
            this.setState({posts: postList, rendered: postList.slice().reverse(), topFive: postList.slice().reverse()})
        }
        
    })
}

    linkHandler = (id) => {
        this.props.history.push(`/${id}`)
    }
 
    render () {
        
        return (
            <div>
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

export default withRouter(List);