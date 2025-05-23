
import { useEffect, useRef, useState } from 'react';
import { firestore } from '../../firebase';
import { addDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import PhotoItem from './PhotoItem';

function Photos() {
    const [photos, setPhotos] = useState([]);
    const once = true;
    
    useEffect(() => {
        try {
            const q = query(collection(firestore, 'photos'), orderBy('date', 'desc'));
            getDocs(q).then(docs => {
                let arr = [];
                docs.forEach((doc) => {
                    let data = doc.data();
                    arr.push(data);
                    console.log(doc.id, " => ", doc.data());
                });
                setPhotos(arr);
            });

            
        } catch(e) {
            console.log(e);
        }
    }, [once]);

  

    return (
        <>
            <h1>Photos</h1>
            <div className='Navigation'>
                <a href='Photos/Create' className="navItem"><img src='Add.png' alt='Add'></img>Add</a>
                
                {photos?.map(({id, title}) => <PhotoItem id={id} title={title} />)}
                <div id="myModal" className="modal">
                    <span className="close" onClick={() => {document.getElementById('myModal').style.display = "none";}}>&times;</span>
                    <img className="modal-content" id="modalImg" alt='img'/>
                    <div id="modalTitle"></div>
                </div>
            </div>
        </>
    );
}

export default Photos;
