import React, { useEffect, useState } from "react";
import Axios from "axios";

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [numberOfPhotos, setNumberOfPhotos] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
      if (showGallery) {
        const fetchPhotos = async () => {
          const response = await Axios.get(`https://api.pexels.com/v1/search?query=${keyword}&per_page=${numberOfPhotos}`, {
            headers: {
              Authorization: 'Qph2TPtF9Ul46r5llgTY2mn9Ve3Xy3DpSOeEdoi2U7wPjAay692FkAef',
            },
          });
          setPhotos(response.data.photos);
        };
    
        fetchPhotos();
      }
    }, [numberOfPhotos, showGallery]);
  
    const handleInputChange = (event) => {
      setNumberOfPhotos(parseInt(event.target.value));
    };
    const handleInputChangeKeyword = (event) => {
      setKeyword(event.target.value);
    };

    const handleSubmit = () => {
      setShowGallery(true);
    };

    return (
      <div>
        {!showGallery && (
          <div>
            <h1>Enter the number of photos</h1>
            <input type="text" onChange={handleInputChangeKeyword} placeholder="Search" />
            <input type="number" value={numberOfPhotos} onChange={handleInputChange} placeholder="number of pictures "/>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
        {showGallery && (
          <div>
            <h1>Photo Gallery</h1>
            <div className="photos">
              {photos.map((photo) => (
                <img key={photo.id} src={photo.src.medium} alt={photo.photographer} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

export default Photos;
