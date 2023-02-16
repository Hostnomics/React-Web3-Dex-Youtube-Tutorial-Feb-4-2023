import React from 'react'

import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useState, useEffect } from 'react'; //Added (16:28)

function Swap() {

// Create state variable `slippage` and `setSlippage` hook (16:36): https://youtu.be/t8U7GRrlYW8?t=996
  const [slippage, setSlippage] = useState(2.5); 

//At (19:45) create state for tokenOneAmount and tokenTwoAmount
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);

  function changeAmount(token){
      setTokenOneAmount(token.target.value); 
      // console.log(`Token One INSIDE changeAmount is: ${tokenOneAmount}`); //one digit less
  }
  // console.log(`Token One OUTSIDE changeAmount is: ${tokenOneAmount}`); //accurate 


  function handleSlippageChange(e){   // const handleSlippage = () => { }
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

    {/* At (18:06) add div outside of our `tradeBoxHeader` div for the inputs: */}
          <div className="inputs">
              <Input placeholder="0" value={tokenOneAmount} onChange={changeAmount} />
              <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          </div>

    </div>
  )
}

export default Swap 