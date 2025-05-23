import { useEffect, useRef, useState } from 'react';
import { firestore } from '../../firebase';
import { addDoc, getDocs, collection, query } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import NoteItem from '../Notes/NoteItem';
import NavItem from '../NavItem';

function MusicCreate() {
    const ref = collection(firestore, 'music');
    const title = useRef(null);
    const file = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(file.current.files[0]);
        let data = new FormData();
        data.append( "file", file.current.files[0] );
        data.append('upload_preset', 'PublicVideos');
        
        try {
            fetch("https://api.cloudinary.com/v1_1/dvn7y9omc/video/upload",
            {
                method: "POST",
                body: data
            }).then(res => res.json())
            .then(data => {
                addDoc(ref, {title: title.current.value, id: data.public_id, author: parseInt(localStorage.getItem('user')), date: Date.now()});
                navigate("/Music");
            });
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <form method="POST" onSubmit={handleSubmit} className='form'>
                <h2>Upload Music</h2>

                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" ref={title} required onInvalid={e => e.target.setCustomValidity('Put a title LA')} onInput={e => e.target.setCustomValidity('')}/>

                <label htmlFor="fileInput">
                    Upload
                    <br />
                    <img src="/Add.png" alt="Upload" />
                </label>
                <input type="file" accept=".mp3,audio/*" id="fileInput" style={{display: 'none'}} ref={file} required/>

                <button className='btn'>Save Music</button>
            </form>
        </div>
    );
}

export default MusicCreate;
