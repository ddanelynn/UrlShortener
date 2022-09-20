import React from "react";
import { useState } from "react";
import Axios from "axios";
import ValidUrl from "valid-url";
import "./UrlGenerator.css"

export const UrlGenerator = () => {

    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [mostPopularUrl, setMostPopularUrl] = useState('');

    const displayMostPopularUrl = () => {
        Axios.post('http://localhost:3001/get-most-popular').then((response) => setMostPopularUrl(formatResponse(response.data)))
    }

    const formatResponse = (data) => {
        let resultString = "";
        data.forEach((row) => {
            resultString += row.shortUrl + ": " + row.count + "\n";
        })
        return resultString
    }

    const submitUrl = () => {
        if (document.body.querySelector('.warning').style.display == 'flex') {
            document.body.querySelector('.warning').style.display = 'none';
        }
        if (!ValidUrl.isUri(longUrl)) {
            toggleWarning()
            return;
        }
        Axios.post('http://localhost:3001/api/shortener', {
            longUrl: longUrl,
        }).then((response) => setShortUrl(response.data))
        displayMostPopularUrl();
    }

    const toggleWarning = () => {
        if (document.body.querySelector('.warning').style.display == 'flex') {
            document.body.querySelector('.warning').style.display = 'none';
        } else {
            document.body.querySelector('.warning').style.display = 'flex';
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
    }

    return (
        <div className="web-container">
            <div className="generator-container">
                <div className="warning">Invalid URL</div>
                <div className="generator-form">
                    <input className="url-input" type="text" placeholder="Shorten your URL" onChange={(e) => {
                        setLongUrl(e.target.value);
                    }}></input>
                    <button className="generate-button" onClick={submitUrl}>Generate</button>
                </div>
                <div className="result-container">
                    <div>Shortened URL: {" "}
                        <a href={shortUrl} target="_blank">{shortUrl}</a></div>
                    <div className="copy-button" onClick={copyToClipboard}>Copy</div>
                </div>
                <div className="most-popular">Most popular link: 
                    <a href={mostPopularUrl}>{mostPopularUrl}</a>
                </div>
            </div>
        </div>
    );
}