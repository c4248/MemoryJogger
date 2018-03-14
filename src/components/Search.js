import React from 'react'

import './css/Search.css'

class Search extends React.Component {

    changeHandler = (e) => {
        this.props.change(e.target.value)
    }

    render(){
        return (

                <div>
                    <label className="field field_type4">
                    <input className="field__input" placeholder="Enter a date: MMM DD YYYY or enter a key word" onChange={this.changeHandler} />
                    
                    <span className="field__label-wrap">
                        <span className="field__label">Find an Entry</span>
                    </span>
                    </label>
                </div> 
        )
    }
}

export default Search