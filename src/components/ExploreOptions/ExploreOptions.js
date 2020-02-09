import React from 'react';
import CardGroup from '../../hoc/CardGroup';
import Card from '../Card/Card';

function ExploreOptions (props) {
    return (
        <CardGroup >
            <Card title="Top Rated" body="Get Top Rated Movies" to="/explore/top" />
        </CardGroup>
    )
}

export default ExploreOptions