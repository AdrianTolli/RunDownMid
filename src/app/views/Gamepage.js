import React from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PlayerCard from '../components/PlayerCard';
import './Gamepage.css';
import SmallSearchBar from '../components/SmallSearchBar';



class gamepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: null,
            champions: null,
        };
        this.getLiveGame = this.getLiveGame.bind(this);
    }

    componentDidMount() {
        fetch('/api/champions/euw1/')
            .then((response) => {
                return response.json();
            }).then((json) => {
                console.log(json);
                this.setState({
                    champions: json
                });
            });
            this.getLiveGame();
    }

    getLiveGame(){
        let name = this.props.name;
        if(this.props.match.params.name){
            name = this.props.match.params.name;
        }
        console.log(name);
        fetch('/api/game/euw1/' + name)
            .then((response) => {
                return response.json();
            }).then((json) => {
                console.log(json);
                this.setState({
                    game: json
                });
            });
    }

    render () {
        const game = this.state.game;
        const champions = this.state.champions;
        if(game === null || typeof game === 'undefined'){
            return <div>Loading game...</div>
        } else if(game.hasOwnProperty('status') && game.status.status_code === 404) {
            return <div>
                <div><SmallSearchBar livegameFunction = {this.getLiveGame.bind(this)}/></div>
                <div>Summoner is not ingame </div>
            </div>
        }

        let participants = [];
        for(var i = 0; i < game.participants.length; i++){

            const currentParticipant = game.participants[i];
            const myChampion = champions.data[currentParticipant.championId];

            participants.push(<PlayerCard champion={myChampion} data={currentParticipant} key={i} />)
        }

        return <div>
            <div>
                <SmallSearchBar livegameFunction = {this.getLiveGame.bind(this)}/>
            </div>
            <div className="teamsContainer">
                <div className="team team1">
                    <h1 className="blueTeam">Blue team</h1>
                    { participants.slice(0,5) }
                </div>
                <div className="team team2">
                    <h1 className="redTeam">Red team</h1>
                    { participants.slice(5) }
                </div>
            </div>
        </div>
    }
}

function mapStateToProps(state){
    return{
        name: state.name
    }
}

export default connect(mapStateToProps)(gamepage);