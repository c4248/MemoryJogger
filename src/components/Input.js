import React from 'react'
import axios from '../axioslog'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import './css/Input.css'

class Input extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            date: moment().format('MMM Do YYYY'),
            post: '', 
            hasCode: false
        }
    }

    formChange  = (e) => {
        if(e.target.value.includes('<code>')){
            this.setState({post: e.target.value, hasCode:true})
        } else {
            this.setState({post: e.target.value})
        }
    }

    clickHandler = (e) => {
        axios.post('/log.json', this.state).then(
            response=>this.props.history.push(`/${response.data.name}`)
            ).catch(err=>console.log(err))

    }

    render () {
        return (
            <div>
                <textarea rows="10" onChange={this.formChange}></textarea>
                <button className="hvr-fade" onClick={this.clickHandler}>SUBMIT</button>
            </div>
        )
    }
}

export default withRouter(Input)