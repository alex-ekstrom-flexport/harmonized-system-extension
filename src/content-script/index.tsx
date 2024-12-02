import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const main = (): void => {
  // Add main tag into DOM
  const el: HTMLDivElement = document.createElement('div')
  el.setAttribute('id', 'hs-code-lookup-extension')
  document.body.appendChild(el)

  ReactDOM.render(<App />, el)
}

main()
