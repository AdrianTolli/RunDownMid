import request from 'request';
import key from './secret';



const urls = {
    summoner: 'https://{region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/{name}',
    liveGame: 'https://{region}.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/{summonerId}',
    champions: 'https://{region}.api.riotgames.com/lol/static-data/v3/champions?tags=image&dataById=true',
    summonerRank: 'https://{region}.api.riotgames.com/lol/league/v3/positions/by-summoner/{summonerId}',
    featuredGame: 'https://{region}.api.riotgames.com/lol/spectator/v3/featured-games',
    summonerStats: 'https://{region}.api.riotgames.com/api/lol/{region}/v1.3/stats/by-summoner/{summonerId}/ranked?season=SEASON3'
}

export const getSummoner = (region, summonerName, callback) => {
    let url = urls.summoner;
    url = url.replace('{region}', region);
    url = url.replace('{name}', summonerName);
    
    _riotApiGet(url, callback);
}

export const getSummonerRank = (region, summonerId, callback) => {
    let url = urls.summonerRank;
    url = url.replace('{region}', region);
    url = url.replace('{summonerId}', summonerId);
    
    _riotApiGet(url, callback);
};

export const getSummonerStats = (region, summonerId, callback) => {
    let url = urls.summonerStats;
    url = url.replace('{region}', region);
    url = url.replace('{summonerId}', summonerId);

    _riotApiGet(url, callback);
};

export const getLiveGame = (region, summonerId, callback) => {
    let url = urls.liveGame;
    url = url.replace('{region}', region);
    url = url.replace('{summonerId}', summonerId);
   
    _riotApiGet(url, callback);
};

export const getChampions = (region, callback) => {
    let url = urls.champions;
    url = url.replace('{region}', region);

    _riotApiGet(url, callback);
}

export const getFeaturedGame = (region, callback) => {
    let url = urls.featuredGame;
    url = url.replace('{region}', region);

    _riotApiGet(url, callback);
}

function _riotApiGet(url, callback){
    let options = {
        url: url,
        headers: {
            'X-Riot-Token': key
        }
    }
    request(options, callback);
}