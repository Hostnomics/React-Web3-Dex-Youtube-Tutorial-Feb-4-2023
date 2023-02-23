_(Covers minutes 35 to 58)_

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

When running, make a call to localhost 3001. 

>Visit http://localhost:3001/tokenPrice and see the empty json we are initially sending from the backend. 

Review [Moralis Docs](https://docs.moralis.io).


## MORALIS API ENDPOINTS AT: https://docs.moralis.io/web3-data-api/reference/get-token-price

[Moralis endpoints](https://docs.moralis.io/web3-data-api/reference/get-token-price). 

**Set up our API call in app.get() to the `tokenPrice` endpoint: 
```js
app.get("/tokenPrice", async (req, res) => {

      const {query} = req; 

      const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressOne
      })

      
      const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressTwo
      })

        console.log(responseOne.raw);
        console.log(responseTwo.raw); 

      // return res.status(200).json(usdPrices);
      return res.status(200).json({});
});

```


**Restart the node server since we made a change.**
**Make the following call in the browser:**

`http://localhost:3001/tokenPrice?addressOne=0x514910771af9ca656af840dff83e8264ecf986ca&addressTwo=0xdac17f958d2ee523a2206206994597c13d831ec7`

This returns in the Visual Studio code node server terminal; 
```js
$ node index.js
Listening for API Calls
{
  nativePrice: {
    value: '4488531490291842',
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH'
  },
  usdPrice: 7.627049403423374,
  exchangeAddress: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  exchangeName: 'Uniswap v3'
}
  nativePrice: {
    value: '588796003197261',
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH'
  },
  usdPrice: 1.0005001000074858,
  exchangeAddress: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  exchangeName: 'Uniswap v3'
}

```

Next, **set up our function `usdPrices` in index.js:**

```js
//At (44:25) added function usdPrices:
  const usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
  }

  return res.status(200).json(usdPrices); //
  // return res.status(200).json({});

```

Backend completed [45:14](https://youtu.be/t8U7GRrlYW8?t=2714). 
Restart node server. 

Make the same URL request: 
`http://localhost:3001/tokenPrice?addressOne=0x514910771af9ca656af840dff83e8264ecf986ca&addressTwo=0xdac17f958d2ee523a2206206994597c13d831ec7`

_(Breaking down the URL structure below)_
```js
    http://localhost:3001/tokenPrice ?
    addressOne = 0x514910771af9ca656af840dff83e8264ecf986ca &
    addressTwo = 0xdac17f958d2ee523a2206206994597c13d831ec7
```

And now the browser displays our tokenOne USD price, tokenTwo USD price and ratio: 
```js
{"tokenOne":7.6262867747459,"tokenTwo":1.0005001000074858,"ratio":7.622474775053835}

```


# AXIOS 
## Make request to from our frontend `dex/src/components/Swap.js` to our backend `dexBack/index.js` with AXIOS

Axios is already installed as a dependency in our `package.json`. so in **SWAP.JS**: 
1. import Axios in `Swap.js`
2. Write a function that will set the current price to our price variable

```js
//1. import Axios
import axios from 'axios'; //Added Axios (47:15)

//2. Create price state (47:22)
const [prices, setPrices] = useState(null); 

//Axios function get price from backend
format: const res = await axios.get('<BASE-URL/tokenPrice', {<query parameter>})

```

```js
//Completed fetchPrices() function
//At (47:58) create ASYNC fetchPrice() to use Axios (need to await)
    async function fetchPrices(addressOne, addressTwo){
      // format: const res = await axios.get('<BASE-URL/tokenPrice', {<query parameter>})
        const res = await axios.get('http://localhost:3001/tokenPrice', {
          params: {addressOne: addressOne, addressTwo: addressTwo}
        })

        // After get response (48:59)
        console.log(res.data); 
        setPrices(res.data)
        
    } //end of fetchPrices

```

## useEffect - [49:53](https://youtu.be/t8U7GRrlYW8?t=2993). 

_node.js is running on mount so it will keep `Listening for API Calls` as we update the front end._
**Only have to restart node.js server when update backend?**
Add `useEffect()`: 
```js
//Added useEffect() at (49:55)
    useEffect(() => {
      fetchPrices(tokenList[0].address, tokenList[1].address);
      // fetchPrices(tokenList[0].address, tokenList[0].address);

    }, [])

```


## SET UP onChange() to update INPUT 2 when user enters INPUT 1 (51:47) - IN our `changeAmout()` function:

1. In `changeAmount` function add an IF statement to CHECK: 
    - we have the price variable, AND
    - change INPUT 2, to the RATIO of INPUT 1 (_same napkin math we do when crusiing CMC, spend $10 for $2.00 coin, get 5 coins (10/2)_).
2. For now, just hardcoding the first two coins initalized to the state. (won't update when coins flipped or add new ones)

```js
  function changeAmount(token){ //used `token` instead of `e` parameter
      setTokenOneAmount(token.target.value); 
      // console.log(`Token One INSIDE changeAmount is: ${tokenOneAmount}`); //one digit less

      //UPDATED w/ if stmt at (52:06)
      if(token.target.value && prices){
          setTokenTwoAmount((token.target.value * prices.ratio).toFixed(5))
      }else{
          setTokenTwoAmount(null); 
      }
  }
  // console.log(`Token One OUTSIDE changeAmount is: ${tokenOneAmount}`); //accurate 

```

### Make changes to coins selected update prices and prices.ratio [53:35](https://youtu.be/t8U7GRrlYW8?t=3215). 
1. As we change our input fields, we have to **set our input fields back to null again**.
    - set input fields to null in `switchTokens()`
    - Solution: Just **set the input fields to NULL at the START of `switchTokens()` everytime!** *See [53:41](https://youtu.be/t8U7GRrlYW8?t=3221).*
2. We have to make a **NEW axios request in our fetchPrices() function to get the updated prices.tokenOne/tokenTwo and prices.ratio**
    - 

3.
```js

//In switchTokens() set input fields AND prices to null when another coin or flip is selected
  function switchTokens(){
    //At (53:41) set input fields to NULL, EVERYTIME switchTokens() is called onClick
    setPrices(null); 
    setTokenOneAmount(null); 
    setTokenTwoAmount(null); 

    // const coinOne = tokenOne; //Don't think we needed variables he set at (26:25)
    // const coinTwo = tokenTwo; 
    setTokenOne(tokenTwo); //tokenOne NOW = tokenTwo (and vice versa on next onClick)
    setTokenTwo(tokenOne); //tokenTwo NOW = tokenOne
  }

```


**RECAP of `tokenOneAmount/tokenTwoAmount` state and `tokenOne/tokenTwo` state: 
```js
** tokenOneAmount / tokenTwoAmount *** HANDLES PRICE (which is fluid, updated via Moralis API)
Value displayed in Input 1 and 2
//At (19:45) create state for tokenOneAmount and tokenTwoAmount
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);

** tokenOne / tokenTwo *** HANDLES the token object (img, ticker, etc) from our json array
//At (24:10) add state for tokenOne and tokenTwo (from tokenList.json)
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);

```


**TO COMPLETE the `switch
1. NULL out prices, setTokenOneAmount and setTokenTwoAmout
2. Perform the swap
3. set the prices to the updated data we get from axios in the `fetchprices()` function: 
```js
  function switchTokens(){
    //NULL OUT prices and tokenOne/TwoAmount
      //At (53:41) set input fields to NULL, EVERYTIME switchTokens() is called onClick
          setPrices(null); 
          setTokenOneAmount(null); 
          setTokenTwoAmount(null); 

    //SWITCH TOKENS AROUND    
      // const one = tokenOne; //We didn't use variables `one` and `two` he set at (26:25), so use the STATE names tokenOne, tokenTwo
      // const two = tokenTwo; 
          setTokenOne(tokenTwo); //tokenOne NOW = tokenTwo (and vice versa on next onClick)
          setTokenTwo(tokenOne); //tokenTwo NOW = tokenOne

    //ASSIGN UPDATED PRICE At (53:56) with CURRENTLY UPDATED (via axios/fetch) prices
        //  fetchPrices(two.address, one.address); //I used addressOne, addressTwo as parameter names in fetchPrices intead of one,two
         fetchPrices(tokenTwo.address, tokenOne.address); //flip one and two
  }

```

 **Added (57:01) so input 1 is disabled if we can't retrieve prices from backend/Moralis API**

```js
    <Input 
        placeholder="0" 
        value={tokenOneAmount} 
        onChange={changeAmount} 
        // Added (57:01) so input 1 is disabled if we can't retrieve prices from backend/Moralis API
        disabled={!prices}
    />

```




