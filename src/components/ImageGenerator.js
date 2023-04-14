import React, { useState } from 'react';
import './ImageGenerator.css';
import API_KEY from './API';
import defaultImage from './generated-image.png';

function ImageGenerator() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateImage = async () => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney", 
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ inputs: text }),
      });

    const blob = await response.blob();
    setImageUrl(window.URL.createObjectURL(blob));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateImage();
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="image-generator-container">
      <h1>Architecture <span>Visualization AI</span></h1>
      <form onSubmit={handleSubmit}>
        <input 
          id="text-input" 
          type="text" 
          value={text} 
          onChange={handleInputChange}
          placeholder='write your prompt... (e.g. a modern social housing in the middle of the city)' 
        />
        <button type="submit">Generate</button>
      </form>

      {imageUrl && (<>
        <div className="image-container">
          <img src={imageUrl} alt="Generated" />
        </div>
        <button onClick={handleDownload}>Download</button>
        </>)}

        {!imageUrl && (
          <div className="image-container">
            <img src={defaultImage} alt="Default" />
        </div>
        )}
    </div>
  );
}

export default ImageGenerator;
