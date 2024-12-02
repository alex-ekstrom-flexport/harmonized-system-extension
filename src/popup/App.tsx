import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

// Define the styles
const useStyles = createUseStyles({
  root: {
    textAlign: 'center',
  },
})

// Define the App component
const App: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>HS Code Lookup Extension</div>
    </div>
  )
}

// Define propTypes for the App component
App.propTypes = {
  classes: PropTypes.object,
}

export default App
