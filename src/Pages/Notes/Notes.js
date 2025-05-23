
import { useEffect, useRef, useState } from 'react';
import { firestore } from '../../firebase';
import { addDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import NoteItem from './NoteItem';
import NavItem from '../NavItem';

function Notes() {
    const ref = collection(firestore, 'notes');
    const [notes, setNotes] = useState([]);
    const once = true;
    // try {
    //     addDoc(ref, info);
    // } catch(e) {
    //     console.log(e);
    // }
    useEffect(() => {
        try {
            const q = query(collection(firestore, 'notes'), orderBy('date', 'desc'));
            getDocs(q).then(docs => {
                let arr = [];
                docs.forEach((doc) => {
                    arr.push({id: doc.id, data: doc.data()});
                    console.log(doc.id, " => ", doc.data());
                });
                setNotes(arr);
            });
            
        } catch(e) {
            console.log(e);
        }
    }, [once]);
  

    return (
        <>
            <h1>Notes</h1>
            <div className='Navigation'>
                <a href='Notes/Create' className="navItem"><img src='Add.png'></img>Add</a>
                {notes?.map(({id, data}) => <NoteItem data={data} id={id} />)}
            </div>
        </>
    );
}

export default Notes;
