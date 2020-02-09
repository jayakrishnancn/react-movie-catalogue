import React from 'react';
import CardGroup from '../../hoc/CardGroup';
import Card from '../Card/Card';

function ExploreOptions (props) {
    return (
        <CardGroup >
            <Card title="Top Rated" body="Get Top Rated Movies" to="/explore/top" />
            <Card title="Now Playing" body="Get a list of movies in theatres." to="/explore/now-playing" />
            <Card title="Popular" body="Get a list of the current popular movies on IMDb." to="/explore/popular" />
            <Card title="Upcoming" body="Get a list of upcoming movies in theatres." to="/explore/upcoming" />
            </CardGroup>
    )
}

export default ExploreOptions