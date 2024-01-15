import React, { useState } from 'react';
import axios from 'axios';

export const Home = () => {
  const [query, setQuery] = useState('');
  const [q, setQ] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [showPdfUpload, setShowPdfUpload] = useState(false);
  const [storeDelete, setStoreDelete] = useState(false);
  const [answer, setAnswer] = useState('');
  const [chunks, setChunks] = useState([]);

  const send = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertShown(false);

    const formData = new FormData();
    const fileInput = document.getElementById('pdfInput');
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('pdfFiles', fileInput.files[i]);
    }

    let url = 'https://qnabot.pythonanywhere.com/';

    try {
      const response = await axios.post(url, formData);
      setLoading(false);

      if (response && response.data) {
        const message = response.data.message;
        const error = response.data.error;

        if (message === 'Vector Store Created') {
          alert('Vector Store Created!!', 'success');
          setStoreDelete(true);
          setAlertShown(true);
          setChunks(response.data.chunks);
        }
        else {
          console.log('error creating vectorstore');
        }
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending files to the backend:', error);
    }
  };

  const question = async (event) => {
    event.preventDefault();
    try {
      const url = 'https://qnabot.pythonanywhere.com/bot/';
      setLoadingAnswer(true);
      const response = await axios.post(url, { query: q, chunks: chunks });
      setLoadingAnswer(false);

      if (response && response.data) {
        const { query, answer } = response.data;
        setQuery(query);
        setAnswer(answer);
      } 
      else{
        console.log("error in query")
      }
    } catch (error) {
      setLoadingAnswer(false);
      console.error('Error sending query to the backend:', error);
    }
  };

  const handleFileChange = (event) => {
    setShowPdfUpload(true);
    const files = event.target.files;
    let names = [];

    for (let i = 0; i < Math.min(files.length, 1); i++) {
      if (files[i].size <= 15 * 1024 * 1024) {
        names.push(files[i].name);
      } else {
        alert('App still in development. File size should be 15MB or less.');
      }
    }

    if (files.length > 1) {
      alert('App still in development. For now only one PDF file is allowed.');
    }

    setFileNames(names);
  };

  const delvector = async (event) => {
    event.preventDefault();
    try {
      const url = 'https://qnabot.pythonanywhere.com/delete_vectorstore/';
      const response = await axios.post(url);

      if (response && response.data) {
        const message = response.data.message;
        if (message === 'DELETED') {
          alert('Vector Store Deleted');
          setAlertShown(false);
          setStoreDelete(false);
          setQuery('');
          setAnswer('');
        } else if (response.data.message === 'Vector Store Not Found') {
          alert('Upload files first');
        }
      }
    } catch (error) {
      console.error('Error sending query to the backend:', error);
    }
  };

  return (
    <>
    <h1>QNA Bot</h1>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 col-lg-6 col-xl-6">
            <div className="card d-flex align-items-center p-3" id="pdfCard">
              <div className="card-body">
                <br />
                <p style={{ fontSize: '18px', color: 'white' }}>
                  Note: WebApp still in development, Please upload PDF files of 10MB or less.
                </p>
                <div className="input">
                  <form method="POST" encType="multipart/form-data">
                    <label
                      htmlFor="pdfInput"
                      style={{ marginRight: '10px', fontSize: '20px', color: 'white' }}
                    >
                      Upload PDF:
                    </label>
                    <input
                      type="file"
                      id="pdfInput"
                      accept=".pdf, .doc, .docx"
                      style={{ flex: 1 }}
                      name="pdfInput"
                      multiple
                      onChange={handleFileChange}
                    />
                    {showPdfUpload && (
                      <>
                        <div className="file-box" id="selectedFiles">
                          {fileNames.map((name, index) => (
                            <p key={index}>{name}</p>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="process"
                          id="processbtn"
                          onClick={send}
                        >
                          Process
                        </button>
                      </>
                    )}
                    {loading && (<div id="loadingIcon" className={loading ? '' : 'd-none'}>
                    <p style={{ color: 'white' }}><i className="fas fa-spinner fa-spin" style={{ color: 'white' }}></i> Processing...</p>
                  </div>)}
                    {alertShown && (
                      <>
                        <br />
                        <br />
                        <div>
                          <div className="styled-heading"> Processing Complete !! </div>
                        </div>
                      </>
                    )}
                  </form>
                  <br />
                  {storeDelete && (
                    <form method="POST" onSubmit={delvector} style={{ fontSize: '20px', color: 'white' }}>
                      Delete the previous Vector Store --{' '}
                      <button type="submit" className="process" style={{ fontSize: '20px' }}>
                        Delete
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-6">
            <div className="card" id="HomeCard">
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: '2px solid #5C8374' }}
              ></div>
              <h5>QNA Bot</h5>
              <div
                className="card-body"
                style={{ position: 'relative'}}
              >
                <div className="card-body" id="messageContainer">
                  <div className="d-flex flex-column-reverse">
                    {query && (
                      <div className="chat1">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                          alt="avatar 1"
                          style={{ width: '45px', height: '100%' }}
                        />
                        <p
                          className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning"
                          style={{ color: 'white', fontSize: '15px' }}
                        >
                          {query}
                        </p>
                        
                      </div>
                    )}
                    {answer && (
                      <div className="chat2">
                        
                        <div>
                          <p
                            className="small p-2 ms-3 mb-3 rounded-3"
                            style={{ color: 'white', fontSize: '15px' }}
                            id="botMessage"
                          >
                            {answer}
                          </p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 2"
                          style={{width: '45px', height: '100%' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-footer text-muted justify-content-start align-items-center p-3">
                  <form method="POST" onSubmit={question}>
                    {alertShown ? (
                      <div className="input-group" style={{ width: '100%' }}>
                        <input
                          type="text"
                          className="form-control input-lg"
                          placeholder="Type message"
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="send"
                          style={{
                            color: 'white',
                            backgroundColor: '#5C8374',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                            transition: 'background-color 0.3s ease-in-out',
                          }}
                        >
                          {loadingAnswer ? 'Loading...' : 'Send'}
                        </button>
                      </div>
                    ) : (
                      <div className="input-group mb-0" style={{ width: '100%' }}>
                        <input
                          type="text"
                          className="form-control input-lg"
                          placeholder="Type message"
                          name="input"
                          id="inputField"
                          disabled
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
