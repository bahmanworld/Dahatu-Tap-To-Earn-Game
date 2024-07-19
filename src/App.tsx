import "./App.css";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserView, MobileView } from "react-device-detect";

function App() {


  // const device = useDevice()
  return (
    <div>
      <BrowserView>
        <div style={{ textAlign: "center", fontSize: 20, padding: 50, zoom: 1.5 }}>
          <div>Desktop is boring,</div>
          <div>Use your mobile instead</div>
          <br />
          <a href="https://x.com" target="_blank" style={{ fontSize: 14 }}>
            More News on X (Formely Twitter)
          </a>
        </div>
      </BrowserView>
      <MobileView>
        <div
          style={{
            height: "100dvh",
            width: "100dvw",
            // maxWidth: 700,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            flexDirection: "column",
          }}
        >
          <Header />
          <Coin />
          <Footer />
        </div>
      </MobileView>
    </div>
  );
}

export default App;
