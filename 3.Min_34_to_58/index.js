import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureChains, mainnet, WagmiConfig, createClient } from 'wagmi'  //At (58:20) Import from Wagmi

//NEED A PROVIDER, YOU CAN GET PROVIDERS FROM ACAME OR INFURA, BUT FOR our case, it sufficies to use the publicProvider: (58:43):
import { publicProvider } from 'wagmi/providers/public';

//At (58:51): 
const { provider, webSocketProvider } = configureChains(
  [mainnet], 
  [publicProvider()]
); 


//create client: 
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);

