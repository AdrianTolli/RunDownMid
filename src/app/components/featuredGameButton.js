import React from 'react';
import { connect } from 'react-redux';
import { setName } from '../redux/action';
import { withRouter } from 'react-router-dom';
import './featuredGameButton.css';

class featuredGameButton extends React.Component {
    constructor(){
        super();
        this.buttonClicked = this.buttonClicked.bind(this);
    };

    buttonClicked(){
        console.log('Featured game button clicked!');
        this.props.history.push('/Gamepage/'  );
    };

    render() {
        return <button onClick={this.buttonClicked} className="featuredButton"> Featured Game </button>
    };

};

export default withRouter(featuredGameButton);