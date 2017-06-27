import React from 'react';
import './Playercard.css';

const championImageUrl = 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/champion/';

export default class PlayerCard extends React.Component{
    render (){
        let rankComponent = <div className="participantRank">Unranked</div>
        let statComponent = <div className="statComponent">First game!</div>
        let soloRank = this.props.data.rank.filter((rankObject) => {
            return rankObject.queueType==="RANKED_SOLO_5x5"
        });
        if(soloRank.length > 0){
            rankComponent = <div className="participantRank">{soloRank[0].tier} {soloRank[0].rank} (lp {soloRank[0].leaguePoints})</div>
        }
        for(let i=0; i<this.props.data.stats.champions.length; i++){
            if(this.props.data.stats.champions[i].id==this.props.champion.id){
                let fullStatList = this.props.data.stats.champions[i];

                let totalWins = this.props.data.stats.champions[i].stats.totalSessionsWon;
                let totalLoses = this.props.data.stats.champions[i].stats.totalSessionsLost;
                let totalGames = totalWins+totalLoses;

                let totalKills = this.props.data.stats.champions[i].stats.maxChampionsKilled;
                let totalAssists = this.props.data.stats.champions[i].stats.totalAssists;
                let totalDeaths = this.props.data.stats.champions[i].stats.maxNumDeaths;
                
                let averageKills = (totalKills/totalGames).toFixed(2);
                let averageAssists = (totalAssists/totalGames).toFixed(2);
                let averageDeaths = (totalDeaths/totalGames).toFixed(2);

                let winsComponent = <div className="winsComponent">W: {totalWins} L: {totalLoses}</div>
                let kdaComponent = <div className="kdaComponent">K/D/A: <br /> {averageKills}/{averageDeaths}/{averageAssists}</div>
                statComponent = <div className="statComponent">{winsComponent} {kdaComponent}</div>
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
            {statComponent}
            <div className="participantChampionName">
                {this.props.champion.name}
            </div>
            </div>
        </div>
    }
}