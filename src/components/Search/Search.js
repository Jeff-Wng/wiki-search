import React from 'react';
import classes from './Search.css';

const search = (props) => {
    return (
        <div className={classes.Search}>
            <div className={classes.Searchbar}>
                <input type="text" placeholder="Search here" value={props.searchVal} name="search" onChange={props.onChangeHandler} onKeyDown={props.onEnterDown}/>
                <button onClick={props.onSearchHandler}>Search</button>
            </div>
            <div className={classes.Slider}>
                <input type="range" min="0" max="20" value={props.sliderVal} name="slider" onChange={props.onChangeHandler} />
                <label>{props.sliderVal}</label>
            </div>
        </div>  
    )
}

export default search;