import "./App.css";
import Coin from "./components/Coin";
import Header from "./components/Header";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 10
        }}
      >
        <Header />
        <Coin />
      </div>
    </div>
  );
}

export default App;
