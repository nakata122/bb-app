import { useEffect, useRef, useState } from 'react';
import Particles from './Particles';
import NavItem from './NavItem';

function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigation = ['Notes', 'Photos', 'Chat', 'Music', 'Videos', 'Bullshit'];
  const images = ['./heart.png', './heart2.png', './cow.jpg', './piggy.png'];

  
  window.addEventListener('beforeinstallprompt', (e) => {
      setDeferredPrompt(e);
  });
  

  const onInstall = () => {
    if(deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  

  return (
    <div className="App">
      {deferredPrompt ? <div className="FullscreenModal"><button onClick={onInstall} className='btn'>Install me</button></div> : ''}
      <button className='btn' onMouseDown={Particles} id='attention'><div className='Blur'>ATTENTION</div></button>
      <div className='Navigation'>
        {navigation.map(item => <NavItem name={item}></NavItem>)}
      </div>
      {images.map(source => <img src={source} style={{display: 'none'}} alt='nav' />)}
    </div>
  );
}

export default Home;
