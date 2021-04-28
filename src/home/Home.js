import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from '../search/SearchBar'
import Tips from './Tips'

function Home() {
  return (
    <Container>
      <Row className="my-4">
        <Col />
        <Col lg={8}>
          <img
            src="https://www.cse.ust.hk/admin/logo/logo-wide-b.png"
            className="w-75 p-4"
            alt="CSE Logo"
          />
        </Col>
        <Col />
      </Row>
      <Row className="my-4">
        <Col />
        <Col lg={8}>
          <SearchBar defaultQuery="" />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col>
          <Tips />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
