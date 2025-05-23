
import { useEffect, useRef, useState } from 'react';
import { firestore } from '../../firebase';
import { addDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import MusicItem from './MusicItem';
import { Link } from 'react-router-dom';

function Music() {
    const [music, setMusic] = useState([]);
    const once = true;
    
    useEffect(() => {
        try {
            const q = query(collection(firestore, 'music'), orderBy('date', 'desc'));
            getDocs(q).then(docs => {
                let arr = [];
                docs.forEach((doc) => {
                    let data = doc.data();
                    arr.push(data);
                    console.log(doc.id, " => ", doc.data());
                });
                setMusic(arr);
            });

            
        } catch(e) {
            console.log(e);
        }
    }, [once]);

  

    return (
        <>
            <h1>Music</h1>
            <div className='Navigation'>
                <Link to='Create' className="navItem"><img src='Add.png' alt='Add'></img>Add</Link>
                
                {music?.map(({id, title}) => <MusicItem id={id} title={title}/>)}
            </div>
        </>
    );
}

export default Music;
