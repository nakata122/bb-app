
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router"
import { firestore } from '../../firebase';
import { addDoc, getDocs, collection, doc, getDoc } from 'firebase/firestore';

function NoteDetails(props) {
    const [note, setNote] = useState([]);
    const once = true;
    const params = useParams();
    const ref = doc(firestore, 'notes', params.id);
    
    useEffect(() => {
        try {
            getDoc(ref).then(noteData => setNote(noteData.data()));
        } catch(e) {
            console.log(e);
        }
    }, [once]);
  

    return (
        <>
            <h1>{note.title}</h1>
            <div className='Description'>
                <p>{note.description}</p>
            </div>
        </>
    );
}

export default NoteDetails;
