import React from 'react'

import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useState, useEffect } from 'react'; //Added (16:28)

import tokenList from "../tokenList.json"; //Added (23:00)



function Swap() {
// Create state variable `slippage` and `setSlippage` hook (16:36): https://youtu.be/t8U7GRrlYW8?t=996
  const [slippage, setSlippage] = useState(2.5); 

//At (19:45) create state for tokenOneAmount and tokenTwoAmount
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);

//At (24:10) add state for tokenOne and tokenTwo (from tokenList.json)
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);

//At (28:19) add state for Modal's isOpen
  const [isOpen, setIsOpen] = useState(false); 


//At (29:13) set state for openModal() method for our assetOne && assetTwo onClick 
  const [changeToken, setChangeToken] = useState(1);  //(29:20) initial state not matter, just set to 1, immediately changes onClick

  function handleSlippageChange(e){   // const handleSlippage = () => { }
    setSlippage(e.target.value); 
  }


  function changeAmount(token){
      setTokenOneAmount(token.target.value); 
      // console.log(`Token One INSIDE changeAmount is: ${tokenOneAmount}`); //one digit less
  }
  // console.log(`Token One OUTSIDE changeAmount is: ${tokenOneAmount}`); //accurate 


  function switchTokens(){
    // const coinOne = tokenOne; //Don't think we needed variables he set at (26:25)
    // const coinTwo = tokenTwo; 
    setTokenOne(tokenTwo); //tokenOne NOW = tokenTwo (and vice versa on next onClick)
    setTokenTwo(tokenOne); //tokenTwo NOW = tokenOne
  }


//At (29:25) create openModal() function for our assetOne && assetTwo onClick 
  function openModal(asset){
    setChangeToken(asset); 
    setIsOpen(true); 
  }

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
  

//At () create fetchDexSwap
    function fetchDexSwap(){
      
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
    // At (27:34) add Ant Deisgn's model here at the top so it hovers over the entire `tradeBox` div:(swap component)
    //SINCE <Modal> will be at the same TOP level as our tradeBox div, we need to add the empty parent tags <> </>
    <>
          <Modal
            open={isOpen}
            footer={null}
            onCancel={() => setIsOpen(false) }
            title="Select a token from Ant Design's imported Modal"
          >
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
                </div>
          </Modal>

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

                {/* At (25:40) add swap input fields button */}
                      <div className="switchButton" onClick={switchTokens}>
                          <ArrowDownOutlined className="switchArrow" />
                      </div>

                {/* At (20:55) Add coin identification for each input field (20:55) */}
                      <div className="assetOne" onClick={() => openModal(1)}>
                          <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
                              {tokenOne.ticker}
                          <DownOutlined />
                      </div>

                      <div className="assetTwo" onClick={() => openModal(2)}>
                          <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
                              {tokenTwo.ticker}
                          <DownOutlined />
                      </div>
                     
                </div> {/* inputs div */}
                    
                <div className="swapButton" onClick={fetchDexSwap} disabled={!tokenOneAmount}>Swap</div>
          </div> {/* tradeBox div */}
    </>
  );
}

export default Swap 
