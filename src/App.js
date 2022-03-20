import React, { useState } from 'react'
import AggridComponent from './components/AggridComponent'
import AggridForm from './components/AggridForm'
import 'milligram'
import './App.css'

function App() {
  const [agGridConfiguration, setAgGridConfiguration] = useState({
    showGrid: false,
    showPagination: true,
    rowSelection: 'single',
    colDefs: [],
    rowData: []
  })

  const handleFormSubmit = (formData) => {
    console.log('formData', formData)
    const colDefs = []

    const colProps = formData.col

    if (colProps.make) {
      colDefs.push({ field: 'make', sortable: colProps.sort, filter: colProps.filter, checkboxSelection: colProps.checkBoxSelection })
    }
    if (colProps.model) {
      colDefs.push({ field: 'model', sortable: colProps.sort, filter: colProps.filter })
    }
    if (colProps.price) {
      colDefs.push({ field: 'price', sortable: colProps.sort, filter: colProps.filter })
    }

    const rowCount = formData.row.make.length
    const formRowData = [...Array(rowCount)].map((value, index) => {
      return { make: formData.row.make[index], model: formData.row.model[index], price: formData.row.price[index] }
    })

    setAgGridConfiguration({
      ...agGridConfiguration,
      showGrid: true,
      showPagination: formData.pagination,
      rowSelection: formData.rowSelection,
      colDefs: colDefs,
      rowData: formRowData
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column column-40">
          <h2>Create Ag grid Form</h2>
          <AggridForm handleFormSubmit={handleFormSubmit} />
        </div>
        <div className="column column-60 ag-theme-alpine" style={{ height: 400, width: 300 }}>
          {agGridConfiguration.showGrid && <><h2>Ag grid</h2><AggridComponent {...agGridConfiguration} /></>}
        </div>
      </div>

    </div >

  )
}

export default App;
