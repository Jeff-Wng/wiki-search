import React from 'react';
import classes from './Results.css';    

const results = (props) => {
    let wikiUrl = "https://en.wikipedia.org/wiki/" + props.name.replace(/ /g, "_")
    return (
        <div className={classes.Results}>
            <a href={wikiUrl}>
                <h3>{props.name}</h3>
                <hr></hr>
                <p>{props.description}</p>
            </a>
        </div>
    )
}

export default results;