import React from 'react';
import { connect } from 'react-redux';
import { setName } from '../redux/action';
import './Searchbar.css';

class SmallSearchBar extends React.Component {

    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    onChange(event){
        this.props.setName(event.target.value);
    }

    keyPressed(event){
        if(event.key == 'Enter'){
            this.props.livegameFunction();
        }
    }

    render() {
        return <input onKeyPress={this.keyPressed} onChange={this.onChange} className="smallSearchbar" type="text" placeholder="Search" />
    }
}

function mapDispatchToProps(dispatch){
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    }
}

export default connect(null, mapDispatchToProps)(SmallSearchBar);