import React, { Component } from 'react';
import searchIcon from '../images/search-icon.png';

let temp_search='';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchword: "Enter Search word"
        }
        this.changeSearchWord = this.changeSearchWord.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.category != prevProps.category) {
            this.setState({
                searchword: "Enter Search word"
            })
        }
    }
    changeSearchWord(e) {
        temp_search = e.target.value;
        this.setState({
            searchword: temp_search
        });

    }

    render() {
        return(
            <div className="search bar">
                <input type="text" name="search_text" value={this.state.searchword} onChange={this.changeSearchWord} />
                <button onClick={this.props.onSearch.bind(null, this.props.category,this.state.searchword)}><img className="icons" src={searchIcon} alt=""/></button>
            </div>
        );
    }

}
