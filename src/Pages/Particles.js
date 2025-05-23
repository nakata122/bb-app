import { createElement } from 'react';
import ReactDOM from 'react-dom';
import {collection, getDocs, where, query } from "firebase/firestore";
import { firestore } from '../firebase'

const images = ['./heart.png', './heart2.png', './cow.jpg', './piggy.png'];
let timeout, timeNoti;
function myTimeout() {
    timeout = setTimeout(() => {
        document.getElementById('attention').classList.remove('animate');
        document.getElementsByClassName('Blur')[0]?.classList.remove('animate');
    }, 200);
}

function Particles(e) {
    
    if(!timeNoti)
    {
        timeNoti = setTimeout(()=>{timeNoti = 0}, 10000);
        const q = query(collection(firestore, 'users'), where('key', '!=', localStorage.getItem('token')));
        getDocs(q)
            .then(data => {
                data.forEach(other => {
                    fetch('https://c9e48b26-long-truth-1a85.redspot122.workers.dev?token=' + other.data().key, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'no-cors',
                        method: 'GET'
                    })
                })
            });
    }
    



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

        const size = (Math.random() * 50) + 20;
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