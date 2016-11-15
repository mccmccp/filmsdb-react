import React, { Component } from 'react';

import { getById, search } from '../api/omdb';

import ListItem from './ListItem';
import SearchField from './SearchField';
import FilmInfo from './FilmInfo';

class SearchInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      items: [],
      pageNumber: 1,
      currentMovie: '',
    };
  }

  componentDidMount() {
    const compareNodes = (clickedEl, findEl) => {
      let currentEl = clickedEl;
      while(currentEl !== findEl && currentEl !== null) {
        currentEl = currentEl.parentNode;
      }
      return currentEl === findEl;
    };
    document.addEventListener('click', (event) => {
      if(!compareNodes(event.target, this.searchInterface)) {
        this.props.changeBurgerStatus();
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.items.length === this.state.items.length) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    if(this.state.items.length === 0) {
      return;
    }
    if(this.wrapper.clientHeight > this.searchList.clientHeight) {
      this.getNextMovies();
    }
  }

  getMovies = (value, number) => {
    search(value, number).then((result) => this.setState({ items: [...this.state.items, ...result], currentMovie: value }))
  }

  getNextMovies() {
    let pageNumber = this.state.pageNumber + 1;
    this.setState( {pageNumber } )
    this.getMovies(this.state.currentMovie, this.state.pageNumber)
  }

  onScrollList = (element) => {
    if(element) {
      this.wrapper = element;
      element.addEventListener('scroll', (event) => {
        if(event.target.scrollTop + event.target.clientHeight + 40 > event.target.scrollHeight) {
          //debugger;
          this.getNextMovies();
        }
      })
    }
  }


  render() {
    const { item, items, itemId } = this.state;
    return (
      <section ref={element => {this.searchInterface = element}} className={this.props.className}>
        <SearchField onSearch={this.getMovies} />
        <div ref={this.onScrollList} className='listHolder'>
          <div ref={element => {this.searchList = element}}>
            { items.map((file) =>
              <ListItem key={file.imdbID} item={file} onGetDetailsPressed={this.props.onGetDetailsPressed} changeBurgerStatus={this.props.changeBurgerStatus} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default SearchInterface;
