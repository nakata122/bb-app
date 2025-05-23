
import { useEffect, useRef, useState } from 'react';
import { firestore } from '../../firebase';
import { addDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import VideoItem from './VideoItem';
import { Link } from 'react-router-dom';

function Videos() {
    const [videos, setVideos] = useState([]);
    const once = true;
    
    useEffect(() => {
        try {
            const q = query(collection(firestore, 'videos'), orderBy('date', 'desc'));
            getDocs(q).then(docs => {
                let arr = [];
                docs.forEach((doc) => {
                    let data = doc.data();
                    arr.push(data);
                    console.log(doc.id, " => ", doc.data());
                });
                setVideos(arr);
            });

            
        } catch(e) {
            console.log(e);
        }
    }, [once]);

  

    return (
        <>
            <h1>Videos</h1>
            <div className='Navigation'>
                <Link to='Create' className="navItem"><img src='Add.png' alt='Add'></img>Add</Link>
                
                {videos?.map(({id, title}) => <VideoItem id={id} title={title}/>)}
            </div>
        </>
    );
}

export default Videos;
