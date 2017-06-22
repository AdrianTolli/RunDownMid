import React from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { setName } from '../redux/action';
import { withRouter } from 'react-router-dom';
import './featuredGameButton.css';

class FeaturedGameButton extends React.Component {
    constructor(){
        super();
        this.buttonClicked = this.buttonClicked.bind(this);
    };



    buttonClicked(){
        console.log('Featured game button clicked!');
        fetch('/api/featuredGame/euw1/')
            .then((response) => {
                return response.json();
            }).then((json) => {
                let randomGameNumber = parseInt((Math.random() * json.gameList.length));
                console.log(json.gameList.length);
                console.log(randomGameNumber);
                let summoner = json.gameList[randomGameNumber].participants[0].summonerName;
                this.props.history.push('/Gamepage/' + summoner );
            });
    };

    render() {
        return <button onClick={this.buttonClicked} className="featuredButton"> Featured Game </button>
    };

};

export default withRouter(FeaturedGameButton);