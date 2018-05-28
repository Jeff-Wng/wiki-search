import React, {Component} from 'react';
import Search from '../../components/Search/Search';
import Results from '../../components/Results/Results';
import Spinner from '../../components/Spinner/Spinner';
import classes from './Wiki.css';
import axios from 'axios';

class Wiki extends Component {
    state = {
        results: [],
        search: '',
        slider: 3,
        isLoading: false,
        noValue: false
    }

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onEnterDown = (event) => {
        if (event.keyCode === 13) {
            this.onSearchHandler();
        }
    }

    onSearchHandler = () => {
        let fetchedResults = [];
        let apiUrl = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&generator=prefixsearch&exsentences=2&exintro=1&explaintext=1&gpslimit=20&gpssearch=";
        let searchTerm = this.state.search.replace(/ /g, "%20");
        let fullUrl = apiUrl + searchTerm;
        if(this.state.search.replace(/ /g, "").length > 0) {
            axios.get(fullUrl)
                .then(response => {
                    this.setState({
                        isLoading: true,
                        noValue: false
                    })
                    for(let key in response.data.query.pages) {
                        fetchedResults.push(response.data.query.pages[key]);
                    }
                    this.setState({
                        results: fetchedResults,
                        search: '',
                        isLoading: false
                    });
                })
        } else {
            this.setState({
                results: fetchedResults,
                search: '',
                noValue: true
            });
        }
    }

    render() {
        let slicedResults = this.state.results.slice(0, this.state.slider);
        let results = slicedResults.map(response => {
            return (
                <Results
                    key={response.pageid}
                    name={response.title}
                    description={response.extract} />
            )
        })

        let loading = null;
        if(this.state.isLoading) {
            loading = <Spinner />
        }

        let warning = null;
        if(this.state.noValue) {
            warning = <p className={classes.Warning}>Please enter a term to search</p>
        }

        return (
            <div className={classes.Wiki}>
                <h1>Wiki Search</h1>
                <Search 
                    onChangeHandler={this.onChangeHandler}
                    searchVal={this.state.search}
                    sliderVal={this.state.slider}
                    onSearchHandler={this.onSearchHandler}
                    onEnterDown={this.onEnterDown} />
                {loading}
                {warning}
                {results}
            </div>
        )
    }
}

export default Wiki;