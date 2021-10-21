import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e =>{
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name: name, email: email}
    //send data to the server
    fetch('http://localhost:5000/users',{
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(data=>{
      const addedUser = data;
      const newUsers = [...users, addedUser];
      setUsers(newUsers);
    })
    nameRef.current.value='';
    emailRef.current.value='';
  }
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input ref={nameRef} type="text" placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="email" />
        <input type="submit" value="Submit" />
      </form>
      <h2>Found users: {users.length}</h2>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.id}:{user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
