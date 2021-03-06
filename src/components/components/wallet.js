import { React, useState, useEffect } from 'react';
// import { createGlobalStyle } from 'styled-components';
import { setWalletAddress } from "../../store/actions/thunks/user";
import { ethers } from 'ethers';
import { useDispatch } from "react-redux";

const Wallet = () => {
    const dispatch = useDispatch();

    const [isConnected, setIsConnected] = useState(false);  //this will be used in another feature

    const [accountAddress, setAccountAddress] = useState('');

    const [haveMetamask, sethaveMetamask] = useState(true); // will be used in another feature in future

    const [accountBalance, setAccountBalance] = useState(true);

    const { ethereum } = window;
    var provider ;

    useEffect(() => {
        // Checking availability of the web3 provider
        const checkMetamaskAvailability = async () => {
            if (!ethereum) {
                alert("Metamask not installed. Please install it manually. Download from this link: https://metamask.io/download/");
                sethaveMetamask(false);
            } else {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                sethaveMetamask(true);
                connectWallet();
            }
        };
        checkMetamaskAvailability();

        console.log("NO META", ethereum)
    }, []);

    //   checking if the metamask is installed
    const checkMetaMaskInstalled = () => {
        if ((typeof window.ethereum == 'undefined')) {
            alert("Metamask not installed. Please install it manually. Download from this link: https://metamask.io/download/");
        }
        else {
            connectWallet();
        }
    }

    //   Connect Wallet to Metamask Server
    const connectWallet = async () => {
        try {
            if(haveMetamask){
                console.log('inside loginwallet')
                if (!ethereum) {
                    sethaveMetamask(false);
                }
    
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });
    
                const balance = await provider.getBalance(accounts[0]);
                const bal = ethers.utils.formatEther(balance);
    
                setAccountAddress(accounts[0]);
    
                setAccountBalance(bal);
                setIsConnected(true);
            }
            
        } catch (error) {
            setIsConnected(false);
        }
    };

    useEffect(() => {
        if (accountAddress) {
            console.log('accountAddress: ', accountAddress)
            dispatch(setWalletAddress(accountAddress))
        };
    }, [accountAddress]);
    return (
        <div className="row">
            {!accountAddress ? <div className="col-lg-3 mb30 metamask" >
                <span className="box-url">
                    <span className="box-url-label">Most Popular</span>
                    <img src="./img/wallet/1.png" alt="" className="mb20" />
                    <h4>Metamask</h4>
                    <p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
                    <button type="button" onClick={checkMetaMaskInstalled} className="btn btn-primary" >Connect</button>
                </span>
            </div> : <div className="col-lg-3 mb30">
                <h1 className='address'>address:   <p>
                    {accountAddress}
                </p>
                </h1>
                <br></br>
                <h1>
                    Balance :    <p>{accountBalance}</p>
                </h1>
            </div>}


            {/* <div className="col-lg-3 mb30">
        <span className="box-url">
            <img src="./img/wallet/2.png" alt="" className="mb20"/>
            <h4>Bitski</h4>
            <p>Bitski connects communities, creators and brands through unique, ownable digital content.</p>
        </span>
    </div>       

    <div className="col-lg-3 mb30">
        <span className="box-url">
            <img src="./img/wallet/3.png" alt="" className="mb20"/>
            <h4>Fortmatic</h4>
            <p>Let users access your Ethereum app from anywhere. No more browser extensions.</p>
        </span>
    </div>    

    <div className="col-lg-3 mb30">
        <span className="box-url">
            <img src="./img/wallet/4.png" alt="" className="mb20"/>
            <h4>WalletConnect</h4>
            <p>Open source protocol for connecting decentralised applications to mobile wallets.</p>
        </span>
    </div>

    <div className="col-lg-3 mb30">
        <span className="box-url">
            <img src="./img/wallet/5.png" alt="" className="mb20"/>
            <h4>Coinbase Wallet</h4>
            <p>The easiest and most secure crypto wallet. ... No Coinbase account required.
            </p>
        </span>
    </div>

    <div className="col-lg-3 mb30">
        <span className="box-url">
            <img src="./img/wallet/6.png" alt="" className="mb20"/>
            <h4>Arkane</h4>
            <p>Make it easy to create blockchain applications with secure wallets solutions.</p>
        </span>
    </div>       

    <div className="col-lg-3 mb30">
        <span className="box-url">
            <img src="./img/wallet/7.png" alt="" className="mb20"/>
            <h4>Authereum</h4>
            <p>Your wallet where you want it. Log into your favorite dapps with Authereum.</p>
        </span>
    </div>    

    <div className="col-lg-3 mb30">
        <span className="box-url">
            <span className="box-url-label">Most Simple</span>
            <img src="./img/wallet/8.png" alt="" className="mb20"/>
            <h4>Torus</h4>
            <p>Open source protocol for connecting decentralised applications to mobile wallets.</p>
        </span>
    </div>                                   */}
        </div>
    );
}


export default Wallet;