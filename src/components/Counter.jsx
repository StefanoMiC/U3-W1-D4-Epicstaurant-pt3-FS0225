// lo Stato dei componenti esiste SOLO nei componenti a Classe

import { Component } from "react";
import { Button } from "react-bootstrap";

class Counter extends Component {
  // lo Stato dei componenti a classe è sempre un oggetto contenente proprietà-valore e si crea con questa semplice sintassi:
  state = {
    count: 0,
    stefano: true
  };

  render() {
    return (
      <div className="text-center my-5">
        <Button
          className="me-1"
          onClick={() => {
            // vogliamo modificare lo stato al click su questo bottone.
            // lo possiamo fare solamente utilizzando il metodo dedicato .setState()
            // setState è un metodo asincrono che fa più cose insieme:
            // - cambia l'effettivo valore nello stato
            // - notifica react dell'avvenuto cambiamento e che farà RIESEGUIRE il metodo render()

            // quando usiamo setState gli dobbiamo fornire un oggetto che descriva quante e quali proprietà vogliamo cambiare.
            // in questo caso ne stiamo cambiando solo 1 e lui manterrà intatta nella memoria del componente quella che non abbiamo menzionato (stefano:true)
            this.setState({ count: this.state.count - 1 });
            // da questo momento in poi in un tempo variabile (async) il dato nello stato verrà cambiato e il metodo render() richiamato
            // l'interfaccia sarà aggiornata in automatico di conseguenza
          }}
        >
          -1
        </Button>

        {/* in questo punto abbiamo collegato un elemento dell'interfaccia ad un dato dello stato
quando lo stato cambia, l'interfaccia si aggiornerà di conseguenza in automatico! */}
        <h2 className="d-inline-block align-middle">{this.state.count}</h2>

        <Button
          className="ms-1"
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          +1
        </Button>
      </div>
    );
  }
}

export default Counter;
