import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { NhostClient, NhostProvider } from '@nhost/react'
import ProtectedRoute from './components/ProtectedRoute'
import { NhostApolloProvider } from '@nhost/react-apollo'

const nhost = new NhostClient({
  subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
  region: process.env.REACT_APP_NHOST_REGION
})

function App() {
  return (
    <>
     <NhostProvider nhost={nhost}>
     <NhostApolloProvider nhost={nhost}>
      <BrowserRouter>
        <Routes>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route
            path="/"
            // highlight-start
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
            // highlight-end
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </NhostApolloProvider>
      </NhostProvider>

      <Toaster />
    </>
  );
}

export default App;
