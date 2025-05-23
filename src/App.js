import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState, React } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { generateToken, messaging } from './firebase';
import { onMessage } from "firebase/messaging";
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Notes from './Pages/Notes/Notes';
import NoteDetails from './Pages/Notes/NoteDetails';
import NoteCreate from './Pages/Notes/NoteCreate';
import Photos from './Pages/Photos/Photos';
import PhotoCreate from './Pages/Photos/PhotoCreate';
import Chat from './Pages/Chat';
import Music from './Pages/Music/Music';
import MusicCreate from './Pages/Music/MusicCreate';
import Videos from './Pages/Videos/Videos';
import VideosCreate from './Pages/Videos/VideosCreate';


function App() {

  useEffect(() => {
    generateToken();
    onMessage(messaging, payload => {
      console.log(payload);
    })
  }, [])

  return (
    <BrowserRouter basename='https://nakata122.github.io/bb-app/'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Notes" element={<Notes />} />
          <Route path="Notes/Create" element={<NoteCreate />} />
          <Route path="Notes/:id" element={<NoteDetails />} />
          <Route path="Photos" element={<Photos />} />
          <Route path="Photos/Create" element={<PhotoCreate />} />
          <Route path="Chat" element={<Chat />} />
          <Route path="Music" element={<Music />} />
          <Route path="Music/Create" element={<MusicCreate />} />
          <Route path="Videos" element={<Videos />} />
          <Route path="Videos/Create" element={<VideosCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
