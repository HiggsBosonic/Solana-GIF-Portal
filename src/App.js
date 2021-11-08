/*
 * We are going to be using the useEffect hook!
 */
import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';


// Change this up to be your Twitter if you want.
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
	'https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif',
	'https://media.giphy.com/media/Bk2DDqB5BTKkTT2VJ2/giphy.gif',
	'https://media.giphy.com/media/3lxD1O74siiz5FvrJs/giphy.gif',
	'https://media.giphy.com/media/tyxovVLbfZdok/giphy.gif'
]

const App = () => {
//state
const [walletAddress, setWalletAddress] = useState(null);
const [inputValue, setInputValue] = useState('');
const [gifList, setGifList] = useState([]);
  //actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

const connectWallet = async () => {


const { solana } = window;

if (solana) {
  const response = await solana.connect();
  console.log('Connected with Public Key', response.publicKey.toString());
  setWalletAddress(response.publicKey.toString());
  }
};

const sendGif = async () => {
  if (inputValue.length > 0) {
    console.log('Gif Link', inputValue);
  } else {
    console.log('Empty input. Try Again.');
  }
};

const onInputChange = (event) => {
  const { value } = event.target;
  setInputValue(value);
};

const renderNotConnectedContainer = () => (
  <button
  className="cta-button connect-wallet-button"
  onClick={connectWallet}
  >
  Connect to Wallet
  </button>
);

const renderConnectedContainer = () => (
 <div className="connected-container">
    <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange} />
    <button className="cta-button submit-gif-button" onClick={sendGif}>Submit</button>
    <div className="gif-grid">
      {gifList.map(gif => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>
);
  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      //call solana program here
      //set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 Vibe GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;