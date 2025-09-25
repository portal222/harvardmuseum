import React, { useState } from "react";
import fallback from "../assets/fallback.png";

const Images = ({ har }) => {
    const [activeImage, setActiveImage] = useState(null);

    const handleImageClick = (url) => {
        setActiveImage(url);
    };

    const imgUrl = har.images?.[0]?.baseimageurl
    return (
        <>
            <img
                src={imgUrl || fallback}
                alt="no picture"
                className="image"
                onClick={() => imgUrl && handleImageClick(imgUrl)}
                onError={(e) => {
                    if (!e.target.src.includes(fallback)) {
                        e.target.src = fallback;
                    }
                }}
            />
            {activeImage && (
                <div className="lightbox" onClick={() => setActiveImage(null)}>
                    <img src={activeImage} alt="" className="lightbox-img" />
                </div>
            )}
        </>
    )
}
export default Images;