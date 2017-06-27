import React from 'react';
import { Provider } from 'react-redux';
import express from 'express';
import { getSummoner, getFeaturedGame, getLiveGame, getChampions, getSummonerRank, getSummonerStats } from './api';
import { renderToString } from "react-dom/server";
import { createStore } from "redux";
import lolreducer from "../app/redux/lolreducer";
import App from "../app/App";
import { StaticRouter } from "react-router";

var app = express();

app.use(express.static('build'));

app.get('/api/game/:region/:name', (req,res) => {
    getSummoner(req.params.region, req.params.name, (error, response, body) => {
        let summoner = JSON.parse(body);
        getLiveGame(req.params.region, summoner.id, (error, reponse, body) => {
            let game = JSON.parse(body);

            if(game.hasOwnProperty('status')){
                res.json(game);
                return;
            };

            let completed = 0;
            let toCompelete = game.participants.length;
            for(let i = 0; i<game.participants.length; i++){

                getSummonerRank(req.params.region, game.participants[i].summonerId, (error, response, body) => {
                    let participantRank = JSON.parse(body);
                    if(participantRank.hasOwnProperty('status')){
                        game.participants[i].rank = [];
                    } else {
                        game.participants[i].rank = participantRank;
                    }
                    completed++;
                    if(completed==toCompelete){
                        res.json(game);
                    };
                });
            };

            let statComplete = 0;
            for(let i = 0; i<game.participants.length; i++){
                getSummonerStats(req.params.region, game.participants[i].summonerId, (error, response, body) => {
                    let participantStat = JSON.parse(body);
                    game.participants[i].stats[i] = participantStat;
                    statComplete++;
                    if(statComplete==toCompelete){
                        res.json(game);
                    };
                });
            };
        });
    });
});

app.get('/api/summonerStat/:region/:summonerId', (req, res) => {
    getSummonerStats(req.params.region, req.params.summonerId, (error, response, body) => {
        res.json(JSON.parse(body));
    });
});

app.get('/api/champions/:region', (req, res) => {
    getChampions(req.params.region, (error, response, body) => {
        res.json(JSON.parse(body));
    });
});

app.get('/api/featuredgame/:region', (req,res) => {
    getFeaturedGame(req.params.region, (error, response, body) => {
        res.json(JSON.parse(body));
    });
});

app.use(handleRender);

function handleRender(req,res){
    const store = createStore(lolreducer);
    const context = {};
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    const preloadedState = store.getState()

    if (context.url) {
        res.writeHead(302, {
            Location: context.url
        });
        res.end()
    } else {
        res.send(renderFullPage(html, preloadedState))
    };

};
function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
};

app.listen(3000, function (){
    console.log('Server is listening on 3000!')
});