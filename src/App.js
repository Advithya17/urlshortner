import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/shorten', {
                originalUrl: longUrl,
            });
    
            console.log('Response from backend:', response.data);  // Log the response
            setShortUrl(response.data.shortUrl);  // Update the state with the shortened URL
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };
    

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter long URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                />
                <button type="submit">Shorten URL</button>
            </form>

            {shortUrl && (
                <div>
                    <h2>Shortened URL:</h2>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                        
                    </a>
                </div>
            )}
        </div>
    );
    
}

export default App;
