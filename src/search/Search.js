import React from 'react'
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Search() {
  const query = useQuery()
  return (
    <Container>
      <Row className={['my-2']}>
        <SearchBar defaultQuery={query.get('q')} />
      </Row>
      <SearchResult query={query.toString()} />
    </Container>
  )
}

export default Search
