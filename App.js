import React, {Suspense, useEffect, useState} from 'react'
import MainRoute from './MainRoute'
import { auth  } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {

  const [user,setUser] = useState('')

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })


  return (
    <div className="container p-1">
      <Suspense fallback="loading">
        <MainRoute 
          user={user}
        />
      </Suspense>
    </div>
  )
}

export default App
