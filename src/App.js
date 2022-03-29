import React from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { Table } from './components/table/Table'

export const App = () => {
  return (
    <>
        <Navbar />
        <div className="page-body-wrapper sidebar-icon">
            <Sidebar />

            <div className="page-body">

                <Table />

                
            </div>
       
        <Footer />
        </div>
       
    </>
  )
}
