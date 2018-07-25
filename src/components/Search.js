import React, { Component } from 'react';
import searchIcon from '../images/search-icon.png';

let temp_search='';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchword: ''
        }
        this.changeSearchWord = this.changeSearchWord.bind(this);
    }

    changeSearchWord(e) {
        temp_search = e.target.value;
        this.setState({
            searchword: temp_search
        });
        console.log(this.state.searchword);
    }

    render() {
        return(
            <div className="search bar">
                <input type="text" name="search_text" defaultValue="Enter Search word" onChange={this.changeSearchWord} />
                <button onClick={this.props.onSearch.bind(null, this.props.category,this.state.searchword)}><img className="icons" src={searchIcon}/></button>
            </div>
        );
    }

}
