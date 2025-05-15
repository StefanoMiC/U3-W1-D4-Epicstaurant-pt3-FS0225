import { Component } from "react";
import { Container, ListGroup, Row, Col, Badge, Alert, Spinner, Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

class ReservationList extends Component {
  state = {
    reservations: [],
    isLoading: true,
    hasError: false,
    errorMessage: ""
  };

  fetchReservations = async () => {
    console.log("fetching...");
    this.setState({ isLoading: true });
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation/");

      if (response.ok) {
        const reservations = await response.json();

        // this.setState({ reservations: reservations })

        this.setState({ reservations }, () => {
          // grazie alla callback impostata come secondo argomento,
          // possiamo avere la certezza che leggendo lo stato qui dentro, questo sia già la versione aggioranta
          // perché questa funzione viene chiamata solo dopo che le operazioni di cambio di stato si sono concluse
          //console.log("fetched", this.state);
          //   this.setState({ isLoading: false });
        });

        //console.log("state", this.state); // questo legge il valore "vecchio" dello stato, perché questo non si è ancora aggiornato (setState è asincrono!)
      } else {
        throw new Error("Errore nel reperimento delle prenotazioni");
      }
    } catch (error) {
      console.log(error);

      //   this.setState({ hasError: true, isLoading: false });
      this.setState({ hasError: true, errorMessage: error.message });
    } finally {
      // siccome spegnevamo il caricamento in entrambi i casi ( positivo e negativo )
      // forse vale la pena impostare lo spegnimento del caricamento nel blocco finally che avviene IN OGNI CASO
      // sarà l'ultima cosa ad eseguirsi prima della fine di questo processo
      this.setState({ isLoading: false });
    }
  };

  deleteReservation = async id => {
    console.log("fetching...");
    this.setState({ isLoading: true });
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation/" + id, { method: "DELETE" });

      if (response.ok) {
        // const deletedReservation = await response.json();

        // alert("hai eliminato la prenotazione di " + deletedReservation.name);

        this.fetchReservations();
      } else {
        throw new Error("Errore nella cancellazione della prenotazione");
      }
    } catch (error) {
      console.log(error);
      this.setState({ hasError: true, errorMessage: error.message, isLoading: false });
    }
  };

  componentDidMount() {
    console.log("componentDidMount()");

    // componentDidMount è un metodo di "LifeCycle" (del ciclo di vita del componente)
    // senza il suo contributo non riusciremmo a creare un'interfaccia a partire da dei dati prelevati da un'API
    // questo perché al ricevimento dei dati avremo sicuramente bisogno di settare uno stato, e ci serve quindi un'area del codice
    // che NON VENGA RICHIAMATA dopo un setState
    // la sua particolarità è appunto quella di venire chiamata UNA VOLTA e UNA SOLTANTO alla fine del montaggio del componente

    // 1) istanziazione del componente (metodo constructor eventuale)
    // 2) render()
    // 3) componentDidMount()
    // 4) setState() successivo al reperimento dei dati di una fetch
    // 5) nuovo render() per aggiorare l'interfaccia

    this.fetchReservations();
  }

  render() {
    console.log("render()");
    // this.fetchReservations(); // ERRORE
    // internamente alla funzione fetchReservations abbiamo, in un qualche momento, un this.setState()
    // che aggiornerà il dato nello state del componente, E POI...
    // farà chiamare a React un'altra volta il metodo render()
    // che internamente avrebbe DI NUOVO la chiamata a this.fetchReservations() creando di fatto un LOOP INFINITO! ☠️

    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={10} md={6}>
            <h2 className="d-inline-block">Prenotazioni</h2>

            {/* loader di caricamento, verrà reso visibile se la proprietà this.state.isLoading sarà true */}
            {this.state.isLoading && <Spinner animation="border" variant="info" />}

            {!this.state.hasError && this.state.reservations.length > 0 ? (
              <ListGroup>
                {this.state.reservations.map(reserv => (
                  <ListGroup.Item key={reserv._id} className="d-flex align-items-center">
                    <span>
                      {reserv.name} per
                      <Badge bg="dark" className="ms-1">
                        <strong>{reserv.numberOfPeople}</strong>
                      </Badge>
                    </span>
                    <span className="ms-auto">{reserv.smoking && "🚬"}</span>
                    <span>{new Date(reserv.dateTime).toLocaleTimeString()}</span>
                    <Button variant="danger" size="sm" className="ms-1" onClick={() => this.deleteReservation(reserv._id)}>
                      <TrashFill title="cliccando qui eliminerai l'elemento corrispondente" />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : !this.state.hasError ? (
              <Alert variant="info">{this.state.isLoading ? "Caricamento..." : "Non ci sono prenotazioni per oggi"}</Alert>
            ) : (
              <Alert variant="danger">{this.state.errorMessage}</Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationList;
