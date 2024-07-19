import "./App.css";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      style={{
        height: "100dvh",
        // maxWidth: '350px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Coin />
      <Footer/>
    </div>
  );
}

export default App;
