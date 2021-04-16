/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from './SearchBar'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

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

function SearchResult({ query }) {
  const { data, error } = useSWR('/api/search.jsp?' + query.toString(), fetcher)

  if (error) return <div>Error!</div>

  return !data ? (
    <Spinner animation="grow" />
  ) : (
    <SearchResultList resultData={data} />
  )
}

const resultCardStyle = css`
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  &: hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
`

function ResultCard({ similarity, documentRecord }) {
  return (
    <Card css={resultCardStyle}>
      <Card.Body>
        <Card.Title>
          <Badge variant="primary">{similarity}</Badge>
        </Card.Title>
        <Card.Title>{documentRecord.title}</Card.Title>
        <Card.Subtitle>
          <a href={documentRecord.url}>{documentRecord.url}</a>
        </Card.Subtitle>
        <Card.Text>
          Last Modification: {documentRecord.lastModificationDate} Size of Page:{' '}
          {documentRecord.pageSize}
        </Card.Text>
        <Card.Text>Child Links:</Card.Text>
        <ul>
          {documentRecord.childLinks.map((parentLink) => (
            <li key={parentLink}>
              <a href={parentLink}>{parentLink}</a>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

function SearchResultList({ resultData }) {
  return resultData.map(({ documentRecord, ...props }) => (
    <Row key={documentRecord.url} className={['mb-2']}>
      <Col>
        <ResultCard documentRecord={documentRecord} {...props} />
      </Col>
    </Row>
  ))
}

export default Search
