import React, { useState, useEffect } from 'react';
import axios from 'axios';

const azureApiKey = process.env.REACT_APP_AZURE_API_KEY;
const azureEndpoint = process.env.REACT_APP_AZURE_ENDPOINT;

const BackgroundRemoval = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultImageURL, setResultImageURL] = useState('');

  useEffect(() => {
    console.log('Azure API Key:', azureApiKey);
    console.log('Azure Endpoint:', azureEndpoint);
  }, []);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const removeBackground = async () => {
    if (!selectedImage) {
      console.error('No image selected.');
      return;
    }

    try {
      // 이미지를 Blob으로 변환
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const arrayBuffer = fileReader.result;

        const response = await axios.post(
          `${azureEndpoint}/computervision/imageanalysis:segment?api-version=2023-02-01-preview&mode=backgroundRemoval`,
          arrayBuffer,
          {
            headers: {
              'Content-Type': 'application/octet-stream',
              'Ocp-Apim-Subscription-Key': azureApiKey,
            },
            responseType: 'blob',
          }
        );

        const url = URL.createObjectURL(response.data);
        setResultImageURL(url);
      };

      fileReader.readAsArrayBuffer(selectedImage);
    } catch (error) {
      console.error('Error removing background:', error);
      if (error.response) {
        console.error('Status:', error.response.status);

        // Blob 데이터를 텍스트로 변환하여 출력
        const reader = new FileReader();
        reader.onload = () => {
          console.error('Data:', reader.result);
        };
        reader.readAsText(error.response.data);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={removeBackground}>Remove Background</button>
      {resultImageURL && <img src={resultImageURL} alt="Result" />}
    </div>
  );
};

export default BackgroundRemoval;
