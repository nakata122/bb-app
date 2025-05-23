import { createElement } from 'react';
import ReactDOM from 'react-dom';
import {collection, getDocs, where, query } from "firebase/firestore";
import { firestore } from '../firebase'

const images = ['./heart.png', './heart2.png', './cow.jpg', './piggy.png'];
let timeout;
function myTimeout() {
    timeout = setTimeout(() => {
        document.getElementById('attention').classList.remove('animate');
        document.getElementsByClassName('Blur')[0]?.classList.remove('animate');
    }, 200);
}

function Particles(e) {
    

    const q = query(collection(firestore, 'users'), where('key', '!=', localStorage.getItem('token')));
    getDocs(q)
        .then(data => {
            data.forEach(other => {
            let body = {
                "message": {
                    "token": other.data().key,
                    "notification": {
                        "title": "BB SEEKS ATTENTION",
                        "body": "Go text her NOW"
                    }
                }
            }

            fetch('https://fcm.googleapis.com//v1/projects/1049861725003/messages:send', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ya29.a0AW4Xtxgy3sT5rWD3d7OBm4eZGKlTh6IA5MVRDlm-y3fLDJSXwv1moPpMKnoKYu3SnE8XeWK81FWBaJLNtPII4_e6RXuh3T1_kW6KDNNFwqAM2zAlt95e8u1cC_f6_oB6PPoFHH5bAd_4FmIAa6yUG_yzO8fE-LzX0Aq6uYsVaCgYKAdcSARYSFQHGX2MijbI6WW6KHvtZn7U9Dt9byw0175'
                },
                method: 'POST',
                body: JSON.stringify(body)
            }).then(res => res.json()).then(data => console.log(data))
        })
    })



    document.getElementById('attention').classList.add('animate');
    document.getElementsByClassName('Blur')[0]?.classList.add('animate');

    if(timeout) {
        clearTimeout(timeout);
        myTimeout();
    }
    else myTimeout();

    for(let i=0; i < 5; i++) {
        const element = document.createElement('img');
        element.src = images[Math.floor(images.length * Math.random())];
        element.className = 'flying';

        const size = (Math.random() * 100) + 50;
        const duration = (Math.random() + 0.5);
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.transform = 'rotate(' + (Math.random()-0.5) * 180 +  'deg)';
        element.style.left = (e.clientX + (Math.random()-0.5) * 200) + 'px';
        element.style.top = (e.clientY + (Math.random()-0.5) * 200) + 'px';
        element.style.transition = 'all ' + duration + 's';
        setTimeout(() => {
            element.style.top = -50 + 'px';
            element.style.transform = 'rotate(' + (Math.random()-0.5) * 180 +  'deg)';
        }, 60);

        setTimeout(() => {
           element.remove();
        }, duration * 1000);
        
        document.getElementById('root').appendChild(element);
    }
}

export default Particles;