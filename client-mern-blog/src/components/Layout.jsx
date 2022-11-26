import React from 'react'
import '../styles/app.scss'
import { Navbar } from './Navbar/Navbar'

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="app">
        <Navbar />
        {children}
      </div>
    </React.Fragment>
  )
}
