import React from 'react';
import { Route } from 'react-router-dom';
import Frontpage from './views/Frontpage';
import Gamepage from './views/Gamepage';
import TopBar from './components/TopBar';
import './App.css';

export default class App extends React.Component {
    render(){
        return <div>
                    <TopBar/>
                    <Route exact path="/" component={Frontpage}/>
                    <Route path="/Gamepage/:name" component={Gamepage}/>
                </div>
    }
}