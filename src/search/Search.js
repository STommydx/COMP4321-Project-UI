import React from 'react'
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Search() {
  const query = useQuery()
  return (
    <Container>
      <Row className="my-3">
        <Col>
          <SearchBar defaultQuery={query.get('q') || ''} />
        </Col>
      </Row>
      <SearchResult query={query.toString()} />
    </Container>
  )
}

export default Search
