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
                let summoner = json.gameList[0].participants[0].summonerName;
                this.props.history.push('/Gamepage/' + summoner );
            });

        this.props.history.push('/Gamepage/'  );
    };

    render() {
        return <button onClick={this.buttonClicked} className="featuredButton"> Featured Game </button>
    };

};

export default withRouter(FeaturedGameButton);