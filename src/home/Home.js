import React from 'react'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'

function Home() {
  const imgUrls = [
    'https://hlma.hanglung.com/wp-content/uploads/2021/01/42f6127413ce6f2b9058318448411169.jpeg',
    'https://media-exp1.licdn.com/dms/image/C4D1BAQGCcZDRzdCLdg/company-background_10000/0/1519801486085?e=2159024400&v=beta&t=nTTF5M9lw8_T_tRTWZON3GRk5VpIYQAunDbIW0GD8fE',
    'https://images.squarespace-cdn.com/content/v1/554be58ee4b0fce4eb8f495e/1572004483746-LFQX0M30CG39037R30W5/ke17ZwdGBToddI8pDm48kP1-Bj6p-IWkwLAesYMMn2ZZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIeF-kcczDUIQFlD2ZQrWrNbJQQiTwHHMoO-9emWIKSiQKMshLAGzx4R3EDFOm1kBS/1.jpg'
  ]

  return (
    <Container fluid>
      <Row>
        <Carousel>
          {imgUrls.map((url) => (
            <Carousel.Item>
              <img className="d-block w-100" src={url} alt="Background" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
    </Container>
  )
}

export default Home
