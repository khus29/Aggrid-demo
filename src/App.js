import React, { useState } from 'react'
import AggridComponent from './components/AggridComponent'
import AggridForm from './components/AggridForm'
import 'milligram'
import './App.css'

function App() {
  const rowMockData = [
    { "make": "Porsche", "model": "Macan", "price": 60000 },
    { "make": "Ford", "model": "Mondeo", "price": 32000 },
    { "make": "Ford", "model": "Escort", "price": 22000 },
    { "make": "Toyota", "model": "Camry", "price": 45000 },
    { "make": "Toyota", "model": "Fortuner", "price": 35000 },
    { "make": "Porsche", "model": "Boxter", "price": 72000 },
    { "make": "Toyota", "model": "Celica", "price": 15000 },
    { "make": "Toyota", "model": "Glanza", "price": 85000 },
]

  const [agGridConfiguration, setAgGridConfiguration] = useState({
    showGrid: false,
    showPagination: true,
    rowSelection: 'single',
    colDefs: [],
    rowData: []
  })

  const handleFormSubmit = (formData) => {
    const colProps = formData.col

    const rowCount = formData.row.make.length
    const formRowData = [...Array(rowCount)].map((value, index) => {
      return { make: formData.row.make[index], model: formData.row.model[index], price: formData.row.price[index] }
    })

    setAgGridConfiguration({
      ...agGridConfiguration,
      showGrid: true,
      showPagination: formData.pagination,
      rowSelection: formData.rowSelection,
      colProps: colProps,
      rowData: formRowData[0].make !== '' ? formRowData : rowMockData,
      enableChart: formData.chart
    })
  }
 
  return (
    <div className="container">
      <div className="row">
        <div className="column column-40">
          <h2>Create Ag grid Form</h2>
          <AggridForm handleFormSubmit={handleFormSubmit} />
        </div>
        <div className="column column-60 ag-theme-alpine" style={{ height: 500, width: 300}}>
          {agGridConfiguration.showGrid && <><h2>Ag grid</h2><AggridComponent {...agGridConfiguration} /></>}
        </div>
      </div>
    </div>

  )
}

export default App;
