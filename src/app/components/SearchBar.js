import React from 'react';
import { connect } from 'react-redux';
import { setName } from '../redux/action';
import './Searchbar.css';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {

    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    };

    onChange(event){
        this.props.setName(event.target.value);
    };

    keyPressed(event){
        if(event.key == 'Enter'){

            this.props.history.push('/Gamepage/' + event.target.value);
        };
    };

    render() {
        return <input onKeyPress={this.keyPressed} onChange={this.onChange} className="searchbar" type="text" placeholder="Search" />
    };
};

function mapDispatchToProps(dispatch){
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    };
};

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));