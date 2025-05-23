import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { useRef } from "react";


const cld = new Cloudinary({
    cloud: {
        cloudName: 'dvn7y9omc'
    }
}); 

function MusicItem({id, title}) {
    const video = useRef();
    
    const fullscreen = () => {
        if(video.current.paused) {
        video.current.play();

        if (!document.fullscreenElement &&    /* alternative standard method */
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (video.current.requestFullscreen) {
                video.current.requestFullscreen();
            } else if (video.current.msRequestFullscreen) {
                video.current.msRequestFullscreen();
            } else if (video.current.mozRequestFullScreen) {
                video.current.mozRequestFullScreen();
            } else if (video.current.webkitRequestFullscreen) {
                video.current.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        }
        else {
            video.current.pause();
        }
    }

    return (<div className="navItem" onClick={fullscreen}>
                <video ref={video} src={cld.video(id).toURL()} />
                {title}
            </div>);
}

export default MusicItem;