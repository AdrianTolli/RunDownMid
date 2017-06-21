import React from 'react';
import SearchBar from '../components/SearchBar';
import FeaturedGameButton from '../components/featuredGameButton';
import './Frontpage.css';


export default class Frontpage extends React.Component {
    render () {
        return <div className='frontpage'>
                <h1> Run down mid</h1>
                <SearchBar/>
                <FeaturedGameButton/>
            </div>
    }
}