_(Covers minutes 35 to )_

## Moralis API to get the token addresses [(35:35)](https://youtu.be/t8U7GRrlYW8?t=2135). 

1. We know their on chain addresses
2. We can use the Moralis API to call the token functions and get the current token prices for each of our tokens

[(35:35)](https://youtu.be/t8U7GRrlYW8?t=2135).


### Start working in `dexback` directory (36:10) - start with .env file

In **dexBack/.env.example**


[37:45](https://youtu.be/t8U7GRrlYW8?t=2265). 

**Edit** `.env.example` file to just `.env` like in Laravel. 
**ADD** your Moralis.io API key. 

**OPEN** new bash terminal, cd into dexStarter and run `npm i` (37:51).


Node.js Express. 

Open `dexBack/index.js` and remove usdPrices since the fn does not exist yet


```js
// Key Change:
// return res.status(200).json(usdPrices);
  return res.status(200).json({});

//Our index.js:
const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/tokenPrice", async (req, res) => {
  // return res.status(200).json(usdPrices);
  return res.status(200).json({});
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});

```

# To start Node.js Backend Server run `node index.js` [38:55](https://youtu.be/t8U7GRrlYW8?t=2335). 

