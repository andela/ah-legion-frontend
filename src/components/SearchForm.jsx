import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, InputGroup } from 'react-bootstrap';
import { fetchSearchResults } from '../store/actions/searchActions';
import store from '../store/store';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  initialSearch = () => {
    const { searchInput } = this.state;
    store.dispatch(fetchSearchResults(searchInput));
  };

  render() {
    const { searchInput } = this.state;
    return (
      <InputGroup className="mb-3">
        <FormControl
          id="searchInput"
          onChange={this.handleChange}
          placeholder="search..."
          aria-label="search"
          aria-describedby="search"
        />
        <InputGroup.Append>
          <InputGroup.Text>
            <Link
              to={'/search/'.concat(searchInput)}
              href={'/search/'.concat(searchInput)}
              onClick={this.initialSearch}
            >
              <i className="fas fa-search" />
            </Link>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default SearchForm;
