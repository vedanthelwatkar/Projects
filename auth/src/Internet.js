import React, {useState, useEffect } from 'react';
import axios from "axios"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Internet = () => {
  const nav = useNavigate();
  const storedToken = Cookies.get("token");
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [message,setMessage] = useState("")
  const [result,setResult] = useState("")
  const [ip,setIp] = useState("")

  useEffect(() => {
    if (!storedToken) {
      nav("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedToken]);

  const gpt = async (event) => {
    event.preventDefault();
    const queryInput = document.getElementById('exampleFormControlInput1').value.trim();
    setMessage(queryInput)
    setIp("");
    if (!queryInput) return;
  
    try {
      const csrfToken = "6NTn65Uehp8qo6HD5HIO66lSpX5kDhUf";
      const url = 'https://docgpt.pythonanywhere.com/internet/';
      setLoadingAnswer(true)
      const response = await axios.post(url, { query: queryInput }, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      });
      console.log('query sent')
      setLoadingAnswer(false)
      if (response && response.data) {
        const result = response.data.result;
        if (result === "nothing happened")
        console.log("directly submitted")
      setResult(result);
        
      }
      else if (response.data.result === "nothing happened"){
        console.log("directly submitted")
      }

    } catch (error) {
      setLoadingAnswer(false)
      console.error('Error sending query to the backend:', error);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, []);


  
  const speakMessage = () => {
    if (result) {
      const utterance = new SpeechSynthesisUtterance(result);
      utterance.lang = 'en-US';
      utterance.rate = 1.2;
  
      speechSynthesis.speak(utterance);
    } else {
      console.log("No result to speak.");
    }
  };

  return (
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div>
            <p className="styled-url-heading" style={{ fontSize: '22px', margin: 0, padding: 0 ,color: 'white'}}>
  Click{' '}
  <a
    href="/home"
    style={{
      textDecoration: 'underline',
      color: 'red',
      fontSize: '22px',
      textAlign: 'left',
      marginBottom: '10px',
    }}
  >
    here
  </a>{' '}
  to get answers from the PDFs
</p>
            </div>
            <div className="card" id="chat2">
              <div className="card-header d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0" style={{color:'white'}}>Get answers from the Internet</h5>
              </div>

              <div className="card-body" data-mdb-perfect-scrollbar="true" id="chat-container" style={{ position: "relative", height: "400px", overflowY: "auto" }}>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div style={{color:'white', fontSize:'18px'}}>
                    {message}
                  </div>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                </div>
                <div className="d-flex flex-row justify-content-start">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                  <div style={{ marginTop: "12px" }}>
                    <div className="result">{result}</div>
                    {result && (
                      <i className="fas fa-volume-up ml-2 mt-3 speaker-icon" onClick={speakMessage}></i>
                    )}
                    {!result && <p></p>}
                  </div>
                </div>
              </div>

              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <form method="POST" className="d-flex align-items-center" style={{ flexGrow: "1" }} onSubmit={gpt}>
                  {/* CSRF Token should be added here, based on your React app setup */}
                  <input type="text" className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Type message" name="ip" value={ip} onChange={(event) => setIp(event.target.value)}  style={{ flex: "1" }} />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">{loadingAnswer ? 'Loading...' : 'Send'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Internet;
