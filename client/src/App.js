
import './App.css';
import Login  from './Login.js';
import { useState, useEffect } from 'react';
import Signup from './Signup';
import Logout from './Logout.js';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import fairy from "./fairy.png"
import Fairy from './Fairy.js';
import Leprechaun from './Leprechaun.js';
 import Game1 from  './Game1.js';
import Witch from './Witch.js';
import Goblin from './Goblin.js';
import Map from './Map.js';
import Warlock from './Warlock.js';
import NavBar from './NavBar.js'
import Home from './Home.js'
import Welcome from './welcome.png'


function App() {
  const [user, setUser] = useState(null);
  const [textBoxes, setTextBoxes] = useState(0)
  // const history = useHistory();
  const [riddles, setRiddles] = useState([])
  const [task, setTask] = useState("")


  // const handleReroute = () => {
  //   console.log("Reroute!")
  //   history.push("/");
  //   }



  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  }, []);


 


  function login (username, password){
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((data) => (user.username ? setUser(data) : null))
  }


  function handleLogout() {
    fetch("/logout", {
        method: "DELETE",
        }).then(() => setUser())
      }


      useEffect(() => {
        fetch("/getTasks")
    .then((res) => res.json())
    .then((data) => setTask(data))}, 
    [])


  


  return (
    <div>
      {user ? <Logout handleLogout={handleLogout}/> : <Login onLogin={setUser}/> }
      {user ? null : <Signup onLogin={setUser} login={login} /> }
       {user? <h2 className = "h-container"> Let's play Kingdom Quest, {user.username}! </h2> :<h1> Welcome to Kingdom Quest!</h1>}
      {user ? <Home/> : null}
      <NavBar user={user}/>
      {user ? null : <img src = {Welcome} className = "size"></img>}
   
      
      
      <Switch>
      <Route exact path="/fairy">
      <Fairy user={user} setUser={setUser}/>
      </Route>
      <Route exact path="/leprechaun">
        <Leprechaun user={user} setUser={setUser}/>
      </Route>
      <Route exact path="/witch">
      <Witch user={user} setUser={setUser}/>
      </Route>
      <Route exact path="/goblin">
      <Goblin user={user} setUser={setUser}/>
      </Route>
      <Route exact path="/map">
      <Map user={user} setUser={setUser}/>
      </Route>
      <Route exact path="/warlock">
      <Warlock/>
      </Route>
      <Route exact path="/">
      <Home user={user} setUser={setUser}/>
      </Route>
      </Switch>

  </div>
  )}

export default App;





