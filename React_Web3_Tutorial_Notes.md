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

