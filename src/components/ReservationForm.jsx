import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
// https://striveschool-api.herokuapp.com/api/reservation/
// proprietà che il server si aspetta di ricevere da noi per ogni prenotazione inviata:

// modello dell'oggetto:

// name <-- string
// phone <-- string
// numberOfPeople <-- string || number
// smoking <-- boolean
// dateTime <-- string || date
// specialRequests <-- string

class ReservationForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: "1",
      smoking: false,
      dateTime: "",
      specialRequests: ""
    },
    alert: {
      isVisible: false,
      variant: "",
      title: "",
      content: ""
    },
    hasError: false
  };

  // i metodi delle classi vanno creati con arrow function
  // così da mantenere il valore del this che corrisponda a quello dell'istanza del componente
  handleSubmit = e => {
    e.preventDefault();

    fetch("https://striveschool-api.herokuapp.com/api/reservation/", {
      method: "POST",
      body: JSON.stringify(this.state.reservation),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (resp.ok) {
          this.handleReset();
          return resp.json();
        } else {
          throw new Error("Invio fallito");
        }
      })
      .then(savedReservation => {
        console.log("reservation saved", savedReservation);

        // visualizziamo un feedback di avvenuta operazione tramite alert di react-bootstrap
        this.setState({
          alert: {
            isVisible: true,
            variant: "success",
            title: "Prenotazione confermata",
            content: `${savedReservation.name}, non vediamo l'ora di ${savedReservation.numberOfPeople > 1 ? "vedervi" : "vederti"}`
          }
        });

        // impostiamo un timer che chiuda in automatico l'alert se l'utente non lo fa entro 5 secondi
        setTimeout(
          () =>
            this.setState({
              alert: {
                isVisible: false,
                variant: "",
                title: "",
                content: ""
              }
            }),
          5000
        );
      })
      .catch(err => {
        console.log("catch", err);

        this.setState({
          hasError: true,
          alert: {
            isVisible: true,
            variant: "danger",
            title: "Errore nella prenotazione",
            content: err.message
          }
        });
      });
  };

  handleChange = (propertyName, propertyValue) => {
    this.setState({ reservation: { ...this.state.reservation, [propertyName]: propertyValue } });
  };

  handleReset = () => {
    this.setState({
      reservation: {
        name: "",
        phone: "",
        numberOfPeople: "1",
        smoking: false,
        dateTime: "",
        specialRequests: ""
      }
    });
  };

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center my-5">
          <Col xs={10} md={6}>
            <h2>Prenota Tavolo</h2>
            <Alert
              show={this.state.alert.isVisible}
              variant={this.state.alert.variant}
              onClose={() => {
                this.setState({
                  alert: {
                    isVisible: false,
                    variant: "",
                    title: "",
                    content: ""
                  }
                });
              }}
              dismissible
            >
              <Alert.Heading>{this.state.alert.title}</Alert.Heading>
              <p>{this.state.alert.content}</p>
            </Alert>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci un nome"
                  value={this.state.reservation.name}
                  // onChange={e => {
                  //   this.setState({ reservation: { ...this.state.reservation, name: e.target.value } });
                  // }}
                  onChange={e => this.handleChange("name", e.target.value)}
                  required
                />
                {(this.state.reservation.name.toLowerCase() === "arnaldo" || this.state.reservation.name.toLowerCase() === "asdrubale") && (
                  <Form.Text className="text-danger">Che brutto nome!</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+393******"
                  value={this.state.reservation.phone}
                  onChange={e => {
                    this.handleChange("phone", e.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="numberOfPeople">
                <Form.Label>Coperti</Form.Label>
                <Form.Select
                  aria-label="numberOfPeople"
                  value={this.state.reservation.numberOfPeople}
                  onChange={e => {
                    this.handleChange("numberOfPeople", e.target.value);
                  }}
                  required
                >
                  <option value="1">Uno</option>
                  <option value="2">Due</option>
                  <option value="3">Tre</option>
                  <option value="4">Quattro</option>
                  <option value="5">Cinque</option>
                  <option value="6">Sei</option>
                  <option value="7">Sette</option>
                  <option value="8">Otto</option>
                  <option value="9">Nove</option>
                  <option value="10">Dieci</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="smoking">
                <Form.Check
                  type="checkbox"
                  label="Fumatori"
                  value={this.state.reservation.smoking}
                  onChange={e => {
                    console.log("event checkbox", e);
                    this.handleChange("smoking", e.target.checked);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateTime">
                <Form.Label>Data e ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={this.state.reservation.dateTime}
                  onChange={e => {
                    this.handleChange("dateTime", e.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="specialRequests">
                <Form.Label>Richieste particolari</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Facci sapere se hai allergie, intolleranze, ecc.."
                  value={this.state.reservation.specialRequests}
                  onChange={e => {
                    this.handleChange("specialRequests", e.target.value);
                  }}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="info" type="submit">
                  Prenota
                </Button>

                {this.state.hasError && (
                  <Badge bg="danger" className="d-flex align-items-center">
                    ERRORE ❌
                  </Badge>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationForm;
