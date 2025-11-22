import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style/main.css"
import App from './App.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'

// Router DOM
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
)
