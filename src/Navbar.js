import React from 'react'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <BootstrapNavbar expand="md" bg="dark" variant="dark">
      <Link to="/">
        <BootstrapNavbar.Brand>CSE Search</BootstrapNavbar.Brand>
      </Link>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/search">
            Search
          </Nav.Link>
          <Nav.Link href="/uploads/guide.pdf">User Guide</Nav.Link>
          <Nav.Link href="/uploads/javadoc">API Javadoc</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  )
}
