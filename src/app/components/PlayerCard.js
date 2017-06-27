import React from 'react';
import './Playercard.css';

const championImageUrl = 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/champion/';

export default class PlayerCard extends React.Component{
    render (){
        let rankComponent = <div className="participantRank">Unranked</div>
        let soloRank = this.props.data.rank.filter((rankObject) => {
            return rankObject.queueType==="RANKED_SOLO_5x5"
        });
        if(soloRank.length > 0){
            rankComponent = <div className="participantRank">{soloRank[0].tier} {soloRank[0].rank} (lp {soloRank[0].leaguePoints})</div>
        }
        for(let i=0; this.props.data.stats.champions.length; i++){
            if(this.props.data.stats.champions[i].id==this.props.champion.id){
                let fullStatList = this.props.data.stats.champion[i];
                let totalWins = this.props.data.stats.champion[i].stats.totalSessionsWon;
                let statComponent = <div className="statWins">{totalWins}</div>
            };
        };

        if(this.props.data.teamId === 100){
            return <div className="participant participantBlueTeam">
                <div className="participantInfo">
                    <div className="participantSummonerName">
                        {this.props.data.summonerName}
                    </div>
                    {rankComponent}
                    {statComponent}
                    <div className="participantChampionName">
                        {this.props.champion.name}
                    </div>
                </div>
                <div className="participantImage">
                    <img src={championImageUrl+this.props.champion.image.full} />
                </div>
            </div>
        }

        return <div className="participant participantRedTeam">
            <div className="participantImage">
            <img src={championImageUrl+this.props.champion.image.full} />
            </div>
            <div className="participantInfo">
            <div className="participantSummonerName">
                {this.props.data.summonerName}
            </div>
            {rankComponent}
            <div className="participantChampionName">
                {this.props.champion.name}
            </div>
            </div>
        </div>
    }
}