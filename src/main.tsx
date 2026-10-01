import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Bounce, ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        rtl={false}
        theme="light"
        transition={Bounce}
      />
    </HashRouter>
  </StrictMode>,
)
