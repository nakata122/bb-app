import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';


const cld = new Cloudinary({
    cloud: {
        cloudName: 'dvn7y9omc'
    }
}); 

function PhotoItem({id, title}) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const clicked = e => {
        console.log(cld.image(id).toURL());
        modal.style.display = "block";
        modalImg.src = cld.image(id).toURL();
        modalTitle.innerHTML = title;
    }

    return (<div className="navItem" onClick={clicked}><AdvancedImage cldImg={cld.image(id)} /> {title}</div>);
}

export default PhotoItem;