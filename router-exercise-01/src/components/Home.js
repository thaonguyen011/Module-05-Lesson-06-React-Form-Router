import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

function Home() {
    // const { username } = useParams();
    const { state } = useLocation();
  return (
    <div>
        <h1>Login success</h1>
        <h3>Hello {state.account.username}</h3>
    </div>
  )
}

export default Home
