import './wdyr'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'react-datepicker/dist/react-datepicker.css'

import * as Sentry from '@sentry/browser'
import AppProviders from 'context'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { name, version } from '../package.json'
import App from './App'

if (process.env.REACT_APP_NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_URL,
    environment: process.env.REACT_APP_NODE_ENV,
    debug: process.env.REACT_APP_NODE_ENV !== 'production',
    release: `${name}@${version}`
  })
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.render(
  <QueryClientProvider client={client}>
    <AppProviders>
      <App />
    </AppProviders>
  </QueryClientProvider>,
  document.getElementById('root')
)
