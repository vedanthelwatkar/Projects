import './App.css';
import {useRef, useState} from "react"
import axios from "axios"

function App() {
  const [username,setUsername] = useState("")
  const [login,setLogin] = useState("")
  const [avatar,setAvatar] = useState("")
  const [id,setId] = useState("")
  const [bio,setBio] = useState("")
  const [email,setEmail] = useState("")
  const [followers,setFollowers] = useState("")
  const [following,setFollowing] = useState("")
  const ip = useRef()

  const send = async () => {
    try{
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      })
      if (response.data===null){
        alert("NO user found")
        return
      }else{
        setAvatar(response.data.avatar_url)
        setLogin(response.data.login)
        setId(response.data.id)
        setBio(response.data.bio)
        setEmail(response.data.email)
        setFollowers(response.data.followers)
        setFollowing(response.data.following)
        ip.current.value = ""
        console.log(response.data)
      }
  }
    catch (error) {
      console.log(error)
      alert("User not found")
      return
    }
  }
  return (
    <>
    <h1>Github Viewer</h1>
    <div className="container">
      <div class="input-container">
        <input placeholder="Enter Username" class="input-field" type="text"onChange={(e)=>{setUsername(e.target.value)}} ref={ip}/>
        <label for="input-field" class="input-label">Enter Username</label>
        <span class="input-highlight"></span>
      </div>
      <button onClick={send} className='getuserbtn'>Submit</button>
    </div>
    {login!==""  ?
    <div className='userinfo-container'>
    <div className='userinfo'>
      <div className='card'>
          <label className="card-label">Avatar</label>
        <div className="card-content">
        <img
        className='profilepic'
        src={avatar || "https://icons.iconarchive.com/icons/papirus-team/papirus-mimetypes/128/unknown-icon.png"}
        alt="NO USER"
      />
        </div>
      </div>
      <div className="card">
          <label className="card-label">Username</label>
        <div className="card-content">
          {login}
        </div>
      </div>
      <div className="card">
          <label className="card-label">Bio</label>
        <div className="card-content">
          {bio !== null ? bio : "NULL"}
        </div>
      </div>
      <div className="card">
          <label className="card-label">Email</label>
        <div className="card-content">
          {email !== null ? email : "NULL"}
        </div>
      </div>
      <div className="card">
          <label className="card-label">Followers</label>
        <div className="card-content">
          {followers !== null ? followers : "NULL"}
        </div>
      </div>
      <div className="card">
          <label className="card-label">Following</label>
        <div className="card-content">
          {following !== null ? following : "NULL"}
        </div>
      </div>
    </div>

    </div>
    : ""}
    </>
  );
}

export default App;
