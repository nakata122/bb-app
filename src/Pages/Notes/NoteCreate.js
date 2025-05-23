
import { useEffect, useRef, useState } from 'react';
import { firestore } from '../../firebase';
import { addDoc, getDocs, collection, query } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import NoteItem from './NoteItem';
import NavItem from '../NavItem';

function NoteCreate() {
    const ref = collection(firestore, 'notes');
    const title = useRef(null);
    const description = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            addDoc(ref, {title: title.current.value, description: description.current.value, author: parseInt(localStorage.getItem('user')), date: Date.now()});
            navigate("/Notes");
        } catch(e) {
            console.log(e);
        }
    }
    
    const onChange = (e) => {
        if (e.target.value == '') {
            e.target.setCustomValidity("Write something LA");
        } else {
            e.target.setCustomValidity("");
        }
    }

    return (
        <div>
            <form method="POST" onSubmit={handleSubmit} className='form'>
                <h2>Create a Note</h2>

                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" ref={title} required onInvalid={e => e.target.setCustomValidity('Put a title LA')} onInput={e => e.target.setCustomValidity('')}/>

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" ref={description} rows="5" required onInvalid={e => e.target.setCustomValidity('You mf write something here')} onInput={e => e.target.setCustomValidity('')}/>

                <button className='btn'>Save Note</button>
            </form>
        </div>
    );
}

export default NoteCreate;
