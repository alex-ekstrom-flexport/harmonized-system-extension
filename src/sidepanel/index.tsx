import React from 'react'
import ReactDOM from 'react-dom/client'
import Sidepanel from './Sidepanel'
import './Sidepanel.css'

const root = document.createElement('div')
root.className = 'container'
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)
rootDiv.render(
  <React.StrictMode>
    <Sidepanel />
  </React.StrictMode>
)
