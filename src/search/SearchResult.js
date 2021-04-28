/** @jsxImportSource @emotion/react */
import useSWR from 'swr'
import React, { useState } from 'react'
import { css } from '@emotion/react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import _ from 'lodash-es'
import { ClimbingBoxLoader } from 'react-spinners'
import FadeIn from 'react-fade-in'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const resultCardStyle = css`
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  &: hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
`

function CardRow({ children, ...props }) {
  return (
    <Row className="mb-2">
      <Col>
        <Card css={resultCardStyle} {...props}>
          {children}
        </Card>
      </Col>
    </Row>
  )
}

export default function SearchResult({ query }) {
  const { data, error } = useSWR('/api/search.jsp?' + query.toString(), fetcher)

  if (!query) return <></>

  if (error)
    return (
      <CardRow>
        <Card.Body>
          <Card.Title>Error!</Card.Title>
          <Card.Text>Opps! An error occurred when fetching.</Card.Text>
          <Card.Text>{error.toString()}</Card.Text>
        </Card.Body>
      </CardRow>
    )

  return !data ? (
    <Row className="my-5 justify-content-center">
      <ClimbingBoxLoader loading={true} />
    </Row>
  ) : (
    <FadeIn>
      <SearchResultList resultData={data} />
    </FadeIn>
  )
}

function ResultCard({ similarity, documentRecord }) {
  return (
    <Card.Body>
      <Card.Title>
        <Badge
          variant="primary"
          css={css`
            background-color: hsl(${Math.round(similarity * 120)}, 100%, 45%);
          `}>
          {similarity.toLocaleString(undefined, {
            maximumFractionDigits: 6,
            minimumFractionDigits: 6
          })}
        </Badge>
      </Card.Title>
      <Card.Title>{documentRecord.title}</Card.Title>
      <Card.Subtitle>
        <a href={documentRecord.url}>{documentRecord.url}</a>
      </Card.Subtitle>
      <Card.Text className="text-secondary mb-0">
        {new Date(documentRecord.lastModificationDate).toDateString()},{' '}
        {documentRecord.pageSize}B
      </Card.Text>
      <Card.Text>
        <KeywordList freqTable={documentRecord.freqTable} />
      </Card.Text>
      <Card.Text className="mb-0">Child Links:</Card.Text>
      <LinksList links={documentRecord.childLinks} />
      <Card.Text className="mb-0">Parent Links:</Card.Text>
      <LinksList links={documentRecord.parentLinks} />
    </Card.Body>
  )
}

function SearchResultList({ resultData }) {
  if (resultData.length === 0) {
    return (
      <CardRow>
        <Card.Body>
          <Card.Title>No Result!</Card.Title>
          <Card.Text>Opps! No result found.</Card.Text>
          <Card.Text>Maybe you can search again?</Card.Text>
        </Card.Body>
      </CardRow>
    )
  }
  return resultData.map(({ documentRecord, ...props }) => (
    <CardRow key={documentRecord.url}>
      <ResultCard documentRecord={documentRecord} {...props} />
    </CardRow>
  ))
}

function LinksList({ links }) {
  const [limit, setLimit] = useState(5)
  return (
    <ul>
      {links.slice(0, limit).map((parentLink) => (
        <li key={parentLink}>
          <a href={parentLink}>{parentLink}</a>
        </li>
      ))}
      {limit < links.length && (
        <li onClick={() => setLimit(limit + 5)}>
          <div
            className="font-italic text-secondary"
            css={{ cursor: 'pointer' }}>
            [Show more...]
          </div>
        </li>
      )}
    </ul>
  )
}

function KeywordList({ freqTable }) {
  const [limit, setLimit] = useState(5)
  const sortedTable = _.sortBy(
    _.map(freqTable, (val, key) => ({ key: key, value: val })),
    (x) => -x.value
  )
  return (
    <>
      {_.map(sortedTable, (item) => (
        <Badge key={item.key} variant="dark" className="mr-1">
          {item.key} <Badge variant="secondary">{item.value}</Badge>
        </Badge>
      )).slice(0, limit)}
      {limit < sortedTable.length && (
        <Badge
          variant="dark"
          onClick={() => setLimit(limit + 10)}
          css={{ cursor: 'pointer' }}>
          Show More...{' '}
          <Badge variant="secondary">{sortedTable.length - limit}+</Badge>
        </Badge>
      )}
    </>
  )
}
