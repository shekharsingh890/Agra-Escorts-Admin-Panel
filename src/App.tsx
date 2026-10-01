import { Routes, Route, Navigate } from 'react-router-dom'
import Contact from './pages/main/Contact'
import Login from './pages/authentication/Login'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const isAuthenticated: boolean = sessionStorage.getItem('isAuthenticated') === 'true';

  return (
    <div className="h-screen w-screen flex">
      <Routes>
        <Route path='/' element={isAuthenticated ? <Navigate to={'/contact'}/> : <Login />} />

        <Route element={<ProtectedRoutes/>}>
          <Route path='/contact' element={<Contact />}/>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
  