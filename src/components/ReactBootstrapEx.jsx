import { Container, Alert, Button, Col, Row, Card } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <>
      <Container fluid="xxl">
        <Alert variant="success">
          This is a success alert—check it out! <Button variant="primary">Primary</Button>
        </Alert>
        {/* 
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4"> */}

        <Row xs={1} md={2} lg={4}>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://placecats.com/300/300" />
              <Card.Body>
                <Card.Title>Cat</Card.Title>
                <Card.Text>MEOW</Card.Text>
                <Button variant="primary">Get Food</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://placecats.com/300/300" />
              <Card.Body>
                <Card.Title>Cat</Card.Title>
                <Card.Text>MEOW</Card.Text>
                <Button variant="primary">Get Food</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://placecats.com/300/300" />
              <Card.Body>
                <Card.Title>Cat</Card.Title>
                <Card.Text>MEOW</Card.Text>
                <Button variant="primary">Get Food</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://placecats.com/300/300" />
              <Card.Body>
                <Card.Title>Cat</Card.Title>
                <Card.Text>MEOW</Card.Text>
                <Button variant="primary">Get Food</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* altro esempio di utilizzo di map per automatizzare la creazione di elementi qualsiasi a partire da un array qualsiasi */}
        {/* <Row md={4}>
        {[...Array(50).keys()].map(n => (
          <Col key={`ex-${n}`}>
            <Badge pill bg="primary">
              {n + 1}
            </Badge>
          </Col>
        ))}
      </Row> */}
      </Container>
    </>
  );
}

export default App;
