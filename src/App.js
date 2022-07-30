import 'sanitize.css/sanitize.css'

import { ApolloProvider } from '@apollo/client'
import Loader from 'components/Loader'
import { useUser } from 'context/user-context'
import { apolloClient } from 'providers'
import React, { lazy, Suspense } from 'react'
import Helmet from 'react-helmet'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Theme from 'theme'

// import { ReactQueryDevtools } from 'react-query/devtools'
const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'))
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

const GlobalStyle = createGlobalStyle`
* {
  border: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Montserrat', sans-serif;
}

button, a {
  cursor: pointer;
  &:disabled{
    cursor: not-allowed;
  }
}
`

const App = () => {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <Loader />
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Theme>
        <Helmet titleTemplate='Nave.rs | %s' />
        <GlobalStyle />
        <Suspense fallback={<Loader />}>
          <Router>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Router>
        </Suspense>
        {/* <ReactQueryDevtools /> */}
      </Theme>
    </ApolloProvider>
  )
}

export default App
