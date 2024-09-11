import { useState } from 'react'
import * as tf from "@tensorflow/tfjs";
import "./App.css";



async function loadModel() {
  const model = await tf.loadLayersModel('assets\SignalClassifier.json');
  console.log('Modelo cargado:', model);
  return model;
}


function ImageUploader() {
  const [model, setModel] = useState(loadModel());
  const [type, setType] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const resizedCanvas = resizeImage(img);
      setResizedImage(resizedCanvas.toDataURL());
    };
    
    img.onerror = (error) => {
      console.error('Error loading image:', error);
    };
    
    img.src = URL.createObjectURL(file);
  };

  const resizeImage = (image) => {
    const width = 224;
    const height = 224;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Ensure the context and image are valid
    if (ctx && image) {
      ctx.drawImage(image, 0, 0, width, height);
    } else {
      console.error('Invalid canvas context or image');
    }

    return canvas;
  };

  const handleClassify = (event) => {
    console.log("IMAGE IS BEING CLASSIFIED")
    const canvas = resizeImage(preview)
  }





  return (
    <div className="image-uploader-container">
      <h1>Image Upload and Preview</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="upload-button"
      />
      {(resizedImage && model)? <button onClick={handleClassify}>Clasificar</button> : <h3>Seleccionar imagen</h3>}
      
      {resizedImage && (
        <div className="preview-container">
          <h3>Image Preview:</h3>
          <img src={resizedImage}
            alt="Resized"
            className="preview-image"
          />
          {type && ( <h3>{type}</h3> )}
        </div>
      )}
    </div>
  );
}

export default ImageUploader
