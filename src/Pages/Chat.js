import { useEffect, useRef, useState } from 'react';
import { firestore } from '../firebase';
import { addDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';

function Chat() {
    const ref = collection(firestore, 'messages');
    const textInput = useRef(null);
    const [messages, setMessages] = useState([]);
    const once = true;

    const getMessages = () => {
        try {
            const q = query(collection(firestore, 'messages'), orderBy('date'));
            getDocs(q).then(docs => {
                let arr = [];
                docs.forEach((doc) => {
                    let data = doc.data();
                    arr.push(data);
                });
                setMessages(arr);
                
            });

            
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        getMessages();
    }, [once]);

    useEffect(() => {
        var objDiv = document.getElementById('chatBox');
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [messages])

    const submitMessage = e => {
        e.preventDefault();
        addDoc(ref, {data: textInput.current.value, author: parseInt(localStorage.getItem('user')), date: Date.now()})
            .then(() => {
                getMessages();
            });
    }

    return (
        <>
            <div className='chatBox' id='chatBox'>
                {messages?.map(({author, data}) => <p className={author ? 'left':'right'}>{author ? <img src='piggy.png' alt=''/>:''} {data} {author ? '':<img src='cow.jpg' alt=''/>}</p>)}
            </div>
            <form className='textWrapper'>
                <input type='text' ref={textInput}/>
                <button onClick={submitMessage}>&#9654;</button>
            </form>
        </>
    );
}

export default Chat;
