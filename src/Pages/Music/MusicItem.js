import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { useRef } from "react";


const cld = new Cloudinary({
    cloud: {
        cloudName: 'dvn7y9omc'
    }
}); 

function MusicItem({id, title}) {
    const audio = useRef();
    const button = useRef();
    console.log(cld.video(id).toURL())
    
    const clicked = e => {
        if(audio.current.paused) {
            audio.current.play();
            button.current.innerHTML = '&#9208;';
        }
        else {
            audio.current.pause();
            button.current.innerHTML = '&#9654;';
        }
    }

    return (<div className="navItem" onClick={clicked}>
            <div />
            <div ref={button}>&#9654;</div>{title}
                <audio ref={audio}>
                    <source src={cld.video(id).toURL()} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>);
}

export default MusicItem;