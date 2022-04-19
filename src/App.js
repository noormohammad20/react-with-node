import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  const handleAddSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const user = { name, email }

    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })

  }
  return (
    <div className="App">
      <h2>My Own Data {users.length}</h2>
      <form onSubmit={handleAddSubmit}>
        <input type="text" name="name" id="name" placeholder='name' />
        <input type="email" name="email" id="email" placeholder='email' />
        <input type="submit" value="User Add" />
      </form>
      <ul>
        {
          users.map(user => <li>key={user.id} Name:{user.name} Email:{user.email}</li>)
        }
      </ul>
    </div>
  )
}

export default App
