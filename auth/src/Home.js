import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import { customAlert } from './alertUtils';

const Home = () => {
  const [fileNames, setFileNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [showPdfUpload, setShowPdfUpload] = useState(false);
  const [referenceVisible, setReferenceVisible] = useState(false);
  const [sentenceVisible,setSentencesVisible] = useState(false)
  const [storeDelete,setStoreDelete] = useState(false)
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [reference, setReference] = useState('');
  const [sentences, setSentences] = useState('');
  const nav = useNavigate();
  const storedToken = Cookies.get("token");

  useEffect(() => {
    const created = localStorage.getItem('created');
    if (created) {
      setAlertShown(true)
      setStoreDelete(true)
    }
    else if (!created){

    }
  }, []);

  useEffect(() => {
    if (!storedToken){
      nav("/login")
    }
  }, [storedToken]);

  const handleFileChange = (event) => {
    setShowPdfUpload(true);
    const files = event.target.files;
    let names = [];
  
    for (let i = 0; i < Math.min(files.length, 1); i++) {
      if (files[i].size <= 15 * 1024 * 1024) {
        names.push(files[i].name);
      } else {
        customAlert('App still in development. File size should be 15MB or less.');
      }
    }
  
    if (files.length > 1) {
      customAlert('App still in development. For now only one PDF file is allowed.');
    }
  
    setFileNames(names);
  };
  

  const pdfIP = async (event) => {
    const csrfToken = '6NTn65Uehp8qo6HD5HIO66lSpX5kDhUf';
    console.log('Form submitted');
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('pdfInput');
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('pdfFiles', fileInput.files[i]);
    }

    try {
      setAlertShown(false);
      setLoading(true);
      const url = 'http://127.0.0.1:8000/';
      const response = await axios.post(url, formData, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      console.log('sent');
      if (response && response.data) {
        const message = response.data.message;
        const error = response.data.error;
        if (message === 'Vector Store Created') {
          customAlert('Vector Store Created!!', 'success');
          console.log("alert")
          localStorage.setItem('created', message)
          setAlertShown(true);
          setStoreDelete(true)
        } else if (message === 'delete file first') {
          customAlert('Delete Vector Store first');
          setAlertShown(true);
        } else if (message === 'no input') {
          customAlert('No input given');
        } else if (message === 'use from the frontend link') {
          console.log('directly submitted');
        } else if (error === 'Disk quota') {
          customAlert('PDF size exceeded');
        } else console.log('error');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending files to the backend:', error);
    }
  };

  const botop = async (event) => {
    event.preventDefault();
    const queryInput = document.getElementById('inputField').value.trim();
    if (queryInput) {
      setReferenceVisible(false);
      setSentencesVisible(false);
    }
    if (!queryInput) return;

    try {
      const csrfToken = '6NTn65Uehp8qo6HD5HIO66lSpX5kDhUf';
      const url = 'http://127.0.0.1:8000/bot/';
      setLoadingAnswer(true);
      const response = await axios.post(
        url,
        { query: queryInput },
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('query sent');
      setLoadingAnswer(false)

      if (response && response.data) {
        const { query, answer, reference, sentences } = response.data;
        setQuery(query);
        setAnswer(answer);
        setReference(reference);
        console.log(reference);
        setSentences(sentences);
      } else if (response.data.message === 'nothing happened'){
        console.log('directly submitted');

      } else if (response.data.message === 'server restarted') {
        customAlert("Server restarted Process Again")
      }
    } catch (error) {
      setLoadingAnswer(false);
      console.error('Error sending query to the backend:', error);
    }
  };

  const delvector = async (event) => {
    event.preventDefault();
    try {
      const csrfToken = '6NTn65Uehp8qo6HD5HIO66lSpX5kDhUf';
      const url = 'http://127.0.0.1:8000/delete_vectorstore/';
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('del req sent');

      if (response && response.data) {
        const message = response.data.message;
        if (message === 'DELETED') {
          customAlert('Vector Store Deleted');
          setAlertShown(false);
          setStoreDelete(false);
          setQuery('');
          setAnswer('');
          setReference('');
          setSentences('');
          localStorage.removeItem('created');
        } else if (response.data.message === 'Vector Store Not Found') {
          customAlert('Upload files first');
        }
      } else if (response.data.message === 'nothing happened') {
        console.log('directly submitted');
      }
    } catch (error) {
      console.error('Error sending query to the backend:', error);
    }
  };

  const speakMessage = () => {
    console.log("called")
    if (answer) {
      console.log("speaking")
      const utterance = new SpeechSynthesisUtterance(answer);
      utterance.lang = 'en-US';
      utterance.rate = 1.2;
  
      speechSynthesis.speak(utterance);
    } else {
      console.log("No answer to speak.");
    }
  };
  

  return (
    <div className="container py-5">
      
      <div className="row">
        <div className="col-md-12 col-lg-6 col-xl-6">
          
        <p className="styled-url-heading" style={{ fontSize: '22px', margin: 0, padding: 0 , color: 'white' }}>Click{' '}<a href="/internet" style={{textDecoration: 'underline',color: 'red',fontSize: '22px',textAlign: 'left',marginBottom: '10px',}}>here</a>{' '}to get answers from the internet</p>
          <div className="card d-flex align-items-center p-3" id="pdfCard">
            <div className="card-body">
              <br />
              <p style={{ fontSize: '18px', color: 'white' }}>Note: WebApp still in development, Please upload PDF files of 10MB or less.</p>
              <div className="input">
                <form method="POST" encType="multipart/form-data">
                  <label
                    htmlFor="pdfInput"
                    style={{ marginRight: '10px', fontSize: '20px', color: 'white'  }}
                  >
                    Upload PDF:
                  </label>
                  <input
                    type="file"
                    id="pdfInput"
                    accept="application/pdf"
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
                        onClick={pdfIP}
                      >
                        Process
                      </button>
                    </>
                  )}
                  <br /><br/>
                  <div id="loadingIcon" className={loading ? '' : 'd-none'}>
                    <p style={{ color: 'white' }}><i className="fas fa-spinner fa-spin" style={{ color: 'white' }}></i> Processing...</p>
                  </div>
                  {alertShown && (
                    <>
                      <br />
                      <br />
                      <div>
                        <div className="styled-heading">
                          {' '}
                          Processing Complete !!{' '}
                        </div>
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
              style={{ borderTop: '4px solid #5C8374' }}
            >
              <h5 className="mb-0" style={{ color: 'white' }}>DocGPT</h5>
              <div className="d-flex flex-row align-items-center">
                <i>
                  <a href="/cp" style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>
                    Change Password
                  </a>
                </i>
                <i>
                  <a href="/logout" style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>
                    Logout
                  </a>
                </i>
              </div>
            </div>
            <div
              className="card-body"
              data-mdb-perfect-scrollbar="true"
              style={{ position: 'relative' }}
            >
              <div className="card-body" data-mdb-perfect-scrollbar="true" id="messageContainer" >
                <div className="d-flex justify-content-between"></div>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                {query && (
                  <>
                    <p
                      className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning"
                      style={{ fontSize: '15px'}}
                    >
                      {query}
                    </p>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                    alt="avatar 1"
                    style={{ width: '45px', height: '100%' }}
                  />
                   </>
                )}
                </div>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div className="d-flex align-items-start">
                  
                    {answer && (
                      <>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                          style={{ width: '45px'}}
                        />
                        <div>
                          <p
                            className="small p-2 ms-3 mb-3 rounded-3"
                            style={{ backgroundColor: '#e7eaf6', fontSize: '15px' }}
                            id="botMessage"
                          >
                            {answer}
                            <i className="fas fa-volume-up ml-2 mt-3 speaker-icon" onClick={speakMessage}></i>
                            
                          </p>
                        </div>
                      </>
                    )}
                    
                    
                  </div>
                </div>
                {answer && (
                   <button className="btn btn-link btn-sm" type="button"onClick={() => setReferenceVisible(!referenceVisible)}>
                      <span className="btn btn-primary btn-sm" style={{ fontSize: '13px' }}>Reference</span>
                    </button>
                 )}
                <div className={`reference-section ${referenceVisible ? 'show' : ''}`} id="referenceSection" style={{ fontFamily: 'inherit', fontSize: '15px', color:'white' }}>
                       {reference ? (

                        <ul style={{ listStyle: 'none', padding: 0 ,marginLeft: '8%'}}>
                          {reference}
                        </ul>
                      ) : (
                        <p>No reference available.</p>
                      )}
                      
                    </div>
                    {answer && (
                   <button className="btn btn-link btn-sm" type="button" onClick={() => setSentencesVisible(!sentenceVisible)}>
                      <span className="btn btn-primary btn-sm" style={{ fontSize: '13px' }}>Get the full reference</span>
                    </button>
                 )}
                <div className={`reference-section ${sentenceVisible ? 'show' : ''}`} id="referenceSection" style={{ fontFamily: 'inherit', fontSize: '15px', color:'white' }}>
                       {sentences ? (

                        <ul style={{ listStyle: 'none', padding: 0 ,marginLeft: '8%'}}>
                          {sentences}
                        </ul>
                      ) : (
                        <p>No reference available.</p>
                      )}
                      
                    </div>
              </div>
              <div className="card-footer text-muted justify-content-start align-items-center p-3">
                <form method="POST" onSubmit={botop}>
                {alertShown ? (
                  <div className="input-group mb-0" style={{ width: '100%' }}>
                    <input
                      type="text"
                      className="form-control input-lg"
                      placeholder="Type message"
                      name="input"
                      id="inputField"
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
                ):
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
                    }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
