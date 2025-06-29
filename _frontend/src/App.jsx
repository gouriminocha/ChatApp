import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'

function App() {
  const [count, setCount] = useState(0)

  return (
    //wrap routes inside Provider, so that all the components 
    // routes can get access of user
    <UserProvider>
      <AppRoutes/>
    </UserProvider>
  
  )
}

export default App
