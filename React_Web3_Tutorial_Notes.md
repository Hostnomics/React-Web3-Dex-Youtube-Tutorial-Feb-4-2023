 ## Setting up App.js

[6:05](https://youtu.be/t8U7GRrlYW8?t=365). 


## React Router (9:49)

[React Router starts at (9:49)](https://youtu.be/t8U7GRrlYW8?t=589).

**In App.js, add this import statement**
**Add the `<Routes>` `</Routes>` tags as follows: 
```js

import { Routes, Route} from "react-router-dom"; //Added (9:49)
import Swap from './components/Swap';
import Tokens from './components/Tokens';

function App() {
  return(
      <div className="App">
        <Header />

        <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Swap />} />
              <Route path="/tokens" element={<Tokens />} />
            </Routes>
        </div>

      </div>
    )
}

```


### Import { Link } from "react-router-dom" in Header.js (which holds our header links)

[11:04](https://youtu.be/t8U7GRrlYW8?t=664). 

**In Header.js**: 
1. import `{ Link }`
2. Wrap our header  menu items in `<Link>` `</Link>` tags: 

```js
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
          <Link to="/" className="link">
            <div className="headerItem">Swap</div>
          </Link>

          <Link to="/tokens" className="link">
            <div className="headerItem">Tokens</div>
          </Link>
      </div>

```



## Import from Ant Design (12:22)
[12:22](https://youtu.be/t8U7GRrlYW8?t=742). 

### SEE Ant Design Docs Here: https://ant.design/docs/react/introduce
At [14:57](https://youtu.be/t8U7GRrlYW8?t=897). he references the [Ant Design Docs located here.](https://ant.design/docs/react/introduce).



**Import and set up what we need from Ant Design in Swap.js**
1. Import what we need from Ant Design
```js
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

```
2. Add the `<SettingOutlined />` box as desired in `Swap.js`'s return statement
```js
 <SettingOutlined className='cog' />

```
3. WRAP the SettingOutlined tag with `<Popover>` `</Popover>` tags and add the settings desired to handle the pop up box.
**IMPORTANT SETTING** prop `content` set to a custom function `settings` we'll define in `Swap.js` in step 4. 
```js
        <Popover 
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className='cog' />
        </Popover>

```

4. define custom `settings` function :
```js
  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippage} >
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

```

5. To handle the `slippage` and `handleSlippage` state, we import `useState` and `useEffect`
```js
import { useState, useEffect } from 'react'; //Added (16:28)

```


6. Create the state `slippage` with **hook** `setSlippage` and set the default `useState` to `2.5`. 
    - Set the `onChange` function `handleSlippageChange` to accept the click event and `setSlippage` to the standard `e.target.value`.
```js
// Create state variable `slippage` and `setSlippage` hook (16:36): https://youtu.be/t8U7GRrlYW8?t=996
    const [slippage, setSlippage] = useState(2.5); 

//standard js function, didn't use an arrow fn.
    function handleSlippageChange(e){
        setSlippage(e.target.value); 
    }

```

So the final result in `Swap.js` is: 

```js
import { useState, useEffect } from 'react'; //Added (16:28)

function Swap() {

// Create state variable `slippage` and `setSlippage` hook (16:36): https://youtu.be/t8U7GRrlYW8?t=996
  const [slippage, setSlippage] = useState(2.5); 

  function handleSlippageChange(e){
    setSlippage(e.target.value); 
  }

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange} >
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <div className="tradeBox">

            <div className="tradeBoxHeader">
                <h4>Swap</h4>
                <Popover 
                    content={settings}
                    title="Settings"
                    trigger="click"
                    placement="bottomRight"
                >
                    <SettingOutlined className='cog' />
                </Popover>

            </div>

            
    </div>
  )
}


```

---
---


### Set up our inputs with Ant Design cheat code: 

1. use `<Input />` tags with the following values: 
```js
    {/* At (18:06) add div outside of our `tradeBoxHeader` div for the inputs: */}
          <div className="inputs">
              <Input placeholder="0" value={tokenOneAmount} onChange={changeAmount} />
              <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          </div>

```

2. Set our **state** variables for input 1 (`tokenOneAmount`) and input 2 (`tokenTwoAmount`) and then create our custom function for `changeAmount`. 

```js
//At (19:45) create state for tokenOneAmount and tokenTwoAmount
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);

  function changeAmount(e){
      setTokenOneAmount(e.target.value); 
      // console.log(`Token One INSIDE changeAmount is: ${tokenOneAmount}`); //one digit less
  }
  // console.log(`Token One OUTSIDE changeAmount is: ${tokenOneAmount}`); //accurate 

```

---
---

>*(See Folder 2.Min_21_to_34 for the notes below)*

### Assign a token to our input field

[Which token does our swap input field apply to at (20:46)](https://youtu.be/t8U7GRrlYW8?t=1246).

At [20:50](https://youtu.be/t8U7GRrlYW8?t=1250). add which token each input field represents. 


**In Swap.js we set up `assetOne` and `assetTwo` divs inside our `inputs` div:** 

```js
    {/* At (18:06) add div outside of our `tradeBoxHeader` div for the inputs: */}
          <div className="inputs">
                <Input placeholder="0" value={tokenOneAmount} onChange={changeAmount} />
                <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          {/* At (20:55) Add coin identification for each input field */}
                <div className="assetOne">

                </div>

                <div className="assetTwo">

                </div>

          </div>

```

At [22:00](https://youtu.be/t8U7GRrlYW8?t=1320). we view the `tokenList.json`, array of coin tickers, links to image, name, address and decimals. 


Import `tokenList.json` into Swap.js
```js
import tokenList from "../tokenList.json"; //Added (23:00)

```

We'll default to USDC and LINK as the initial STATE: 

Create state for `tokenOne` and `tokenTwo`: 
```js
//At (24:10) add state for tokenOne and tokenTwo (from tokenList.json)
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);

//Set the layout for tokenOne and tokenTwo: 
    {/* At (18:06) add div outside of our `tradeBoxHeader` div for the inputs: */}
          <div className="inputs">
                <Input placeholder="0" value={tokenOneAmount} onChange={changeAmount} />
                <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          {/* Add coin identification for each input field (20:55) */}
                <div className="assetOne">
                    <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenOne.ticker}
                    <DownOutlined />
                </div>

                <div className="assetTwo">
                    <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenTwo.ticker}
                    <DownOutlined />
                </div>

          </div>

```

### Swap input fields Logic (25:25)
At [25:25](https://youtu.be/t8U7GRrlYW8?t=1525). we'll add the **Swap** button for the coins shown in the two input fields. 

**Switch Arrow with onClick set to method `switchTokens`: 
```js
          {/* At (25:40) add swap input fields button */}
                <div className="switchButton" onClick={switchTokens}>
                    <ArrowDownOutlined className="switchArrow" />
                </div>

```

[26:25](https://youtu.be/t8U7GRrlYW8?t=1585). We add the swap logic for `switchTokens`: 
```js
  function switchTokens(){
    // const coinOne = tokenOne; //Don't think we needed variables he set at (26:25)
    // const coinTwo = tokenTwo; 
    setTokenOne(tokenTwo); //tokenOne NOW = tokenTwo (and vice versa on next onClick)
    setTokenTwo(tokenOne); //tokenTwo NOW = tokenOne
  }

```


### Add modal for drop down menu of coins in our array of coins in tokenList.json (27:08)

[27:08](https://youtu.be/t8U7GRrlYW8?t=1628). Add modal 



**`<Modal>` `</Modal>` arguments**:
1. We need to create the `isOpen` STATE variable
2. Use isOpen's state hook function setIsOpen() b/t true/false to show/hide modal.
3. Don't need the footer, so set to null.
```js

        <Modal
            open={isOpen}
            footer={null}
            onCancel={() => setIsOpen(false) }
            title="Select a token from Ant Design's imported Modal"
          >


          </Modal>

```

**Set the `isOpen` state hook to false by default:  (28:25)
```js
//At (28:19) add state for Modal's isOpen
  const [isOpen, setIsOpen] = useState(false); 

```

Function `openModal(1)` and pass it an argument to know which input to track
```js
    <div className="assetOne" onClick={() => openModal(1)}> 
        <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.ticker}
        <DownOutlined />
    </div>

```

**Create STATE for our `openModal()` since it takes an input and it needs to store the input number, either asset 1 or asset 2**
1. Set state to 1, but doesn't matter since it immediatley changed when called. 
2. Our openModal function takes the input number "`asset`" and also must OPEN the modal via `setIsOpen(true)`: 
```js
//At (29:13) set state for openModal() method for our assetOne && assetTwo onClick 
  const [changeToken, setChangeToken] = useState(1); 

//At (29:25) create openModal() function for our assetOne && assetTwo onClick 
  function openModal(asset){
    setChangeToken(asset); 
    setIsOpen(true); 
  }

```

**EMPTY MODAL OPENS at (29:59)**
So now our Modal opens onClick for one of our two input fields (29:59)
![Empty Modal](https://imgur.com/poZVlNN.png)


### LOOP THROUGH the coin "DB", here an array from `tokenList.json` [31:12](https://youtu.be/t8U7GRrlYW8?t=1872).
**INSIDE THE MODAL, we add**: 
```js

  {/* At (30:22) .map() through our Modal list of tokens: */}
    <div className="modalContent">
        {tokenList?.map((token,key) => {
            return(
            <div
                className="tokenChoice"
                key={key}
                onClick={() => modifyToken(key)}
            >
            
                <img src={token.img} alt={token.ticker} className="tokenLogo" />

                <div className="tokenChoiceNames">
                        <div className="tokenName">{token.name}</div>
                        <div classname="tokenTicker">{token.ticker}</div>
                </div>

            </div>
            ); 
        })}

```



**NEXT: Build `modifyToken(key)` function to make a selection from the list of coins.

```js

//the onClick fn:
 onClick={() => modifyToken(key)}

//At (32:24) create modifyToken() function to select a coin from our list.
  function modifyToken(key){
    //We need to use state created (29:13) const [changeToken, setChangeToken] = useState(1); 
    //the setChangeToken() fn always sets token in INPUT 1 as 1, which we catch in the IF condition
    //the ELSE condition catches the token in INPUT 2, which is always set as 2. 
        if(changeToken === 1){  
        // console.log(key); //returns the array index for each token in array
        setTokenOne(tokenList[key]);
        } else {
        setTokenTwo(tokenList[key]);
        }

    //Don't forget to CLOSE the modal after the if/else statement executes here: 
        setIsOpen(false); 

    }

```


#### Create Swap Button (34:02)

1. Outside of our inputs div, but inside of our tradeBox div, add the swap button. 
2. It will be disabled if tokenOneAmount (input 1) is empty (`!tokenOneAmount`)
    - NOTE: Input 2 is always disabled. User can only add value to Input 1. 
        - Input 2 will auto fill based on the conversation rate form the moralis API/1inch aggregator.

```js
        </div> {/* inputs div */}
            
        <div className="swapButton" onClick={fetchDexSwap} disabled={!tokenOneAmount}>Swap</div>
    </div> {/* tradeBox div */}

```


---
---


_(See Folder 3.Min_34_to_58)_

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


## Import Wagmi (58:16) To setup our connect button to our browser wallet
At [58:20](https://youtu.be/t8U7GRrlYW8?t=3500). **IMPORT Wagmi** into `dex/src/index.js`: 

```js
import { configureChains, mainnet, WagmiConfig, createClient } from 'wagmi'  //At (58:20) Import from Wagmi

```

[Read more about infura here](https://decrypt.co/resources/what-is-infura).

[Visit Infura directly here](https://www.infura.io/). 

