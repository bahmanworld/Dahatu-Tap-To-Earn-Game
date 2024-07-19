import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl={
        "https://sapphire-changing-barnacle-242.mypinata.cloud/ipfs/QmUHnhRYt1cn8f4U4aXtDNzv1QDAxKoVJwp6wocAFxnigP"
      }
    >
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
