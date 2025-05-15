import "./App.css";

import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import TopBar from "./components/TopBar";
// import Counter from "./components/Counter";

function App() {
  return (
    <>
      {/* <Counter /> */}
      <TopBar claim="— Niente secondi piatti" />

      <ReservationList />
      <ReservationForm />
      <Home />
    </>
  );
}

export default App;
