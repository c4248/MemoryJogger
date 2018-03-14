import React from 'react'
import axios from '../axioslog.js'
import './css/Entry.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/styles/hljs'
import { withRouter } from 'react-router-dom'

class Entry extends React.Component {

    state = {
        entry: null,
        hasCode: false,
        code: '',
        language: '',
        indexToInsert: null,
    }

    componentDidMount(){
        axios.get(`/log/${this.props.match.params.id}.json`).then(
            response=>{
                this.setState({entry: response.data})
                this.finalizeEntry()
            }
        )
        
    }
    
    clickHandler(){
        this.props.history.push('/')
    }

    finalizeEntry () {
        const post = this.state.entry.post
        if(post.includes('<code>')){

            let start = post.indexOf('<code>') + 6
            let language = post.slice(start, start+1)
            let end = post.indexOf('</code>')
            this.setState((prevState, props)=>{return{
                code: post.slice(start+1, end),
                language,
                hasCode: true,
                indexToInsert: start-6,
                entry: {
                    post: "".concat(
                        prevState.entry.post.slice(0,start-6), 
                        prevState.entry.post.slice(end+7, prevState.entry.post.length)
                    ),
                    date: prevState.entry.date
                }
            }})
        }
    }

    render(){
        let toRender = null
        if(this.state.hasCode){
            let splitString = this.state.entry.post.slice(0,this.state.indexToInsert)

            let splitString2 = this.state.entry.post.slice(this.state.indexToInsert, this.state.entry.post.length)

            toRender = (
                <div>
                    <p className='Spaced'>{splitString}</p>
                    <SyntaxHighlighter className="Syntax" language='javascript' style={dark}>{this.state.code}</SyntaxHighlighter>
                    <p className='Spaced'>{splitString2}</p>
                </div>
            )
        }else if(this.state.entry !== null){
            toRender = (
                <div>
                    <p className='Spaced'>{this.state.entry.post}</p>
                </div>
            )
        }

        return (
            <div>
                <button className="hvr-fade" onClick={this.clickHandler.bind(this)}>HOME</button>
                {this.state.entry ?
                    <div>
                        <h1>{this.state.entry.date.toUpperCase()}</h1>
                        {toRender}
                    </div> :

                    <p>Loading...</p>
                }
            </div>
        )
    }
}

export default withRouter(Entry)