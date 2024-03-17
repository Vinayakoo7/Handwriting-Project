import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictedText, setPredictedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPredictedText(response.data.text);
    } catch (error) {
      console.error(error);
      // Handle error appropriately (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Handwritten Text Recognition</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile || isLoading}>
          {isLoading ? 'Loading...' : 'Predict'}
        </button>
      </form>
      {isLoading && <p>Processing image...</p>}
      {predictedText && <p>Predicted Text: {predictedText}</p>}
    </div>
  );
}

export default App;