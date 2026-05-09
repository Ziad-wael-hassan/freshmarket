import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { FilterProvider } from './context/FilterContext'
import '@/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <HelmetProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <FilterProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </FilterProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: '16px',
                    background: 'var(--toast-background, #fff)',
                    color: 'var(--toast-color, #111827)',
                  },
                  success: {
                    iconTheme: { primary: '#22c55e', secondary: '#ffffff' },
                  },
                  error: {
                    iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
                  },
                }}
              />
            </BrowserRouter>
          </HelmetProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
