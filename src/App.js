import React, { useState } from 'react'
import AggridComponent from './components/AggridComponent'
import AggridForm from './components/AggridForm'
import 'milligram'
import './App.css'

function App() {
  const rowMockData = [
    { "id": 6, "systemCode": "dashboard 3563be12", "system": "PFW","caption":"Stoxx SI Binder Cmpt","viewType":9},
    { "id": 6, "systemCode": "dashboard 3563be12", "system": "PFW","caption":"Stoxx SI Binder Cmpt","viewType":9},
    { "id": 7, "systemCode": "dashboard 3318864c", "system": "PFW","caption":"R3000 SI Binder","viewType":9 },
    { "id": 25, "systemCode": "web query tool 4a2bc1a8", "system": "PFW","caption":"QAAutoDemo","viewType":9 },
    { "id": 337, "systemCode": "dashboard 03f51ceb", "system": "PFW","caption":"Demo Filter","viewType":9 },
    { "id": 339, "systemCode": "dashboard af1d40e3", "system": "PFW","caption":"abc","viewType":9 },
    { "id": 384, "systemCode": "dashboard b60f2a5c", "system": "PFW","caption":"T2","viewType":9 },
    { "id": 424, "systemCode": "dashboard 709a3630", "system": "PFW","caption":"ViewQuery","viewType":9 },
    { "id": 427, "systemCode": "dashboards 4c145a3b", "system": "PFW","caption":"testsvq","viewType":9 },
    { "id": 447, "systemCode": "dashboards 6f2934cf", "system": "PFW","caption":"TEST REG 082022","viewType":9 },
    { "id": 448, "systemCode": "dashboard bba7296d", "system": "PFW","caption":"Leo Dashboard Test","viewType":9 },
    { "id": 450, "systemCode": "dashboard 316287b2", "system": "PFW","caption":"Test chart","viewType":9 },
]

  const [agGridConfiguration, setAgGridConfiguration] = useState({
    showGrid: false,
    showPagination: false,
    rowSelection: 'single',
    colDefs: [],
    rowData: []
  })

  const handleFormSubmit = (formData) => {
    const colProps = formData.col
    const rowCount = formData.row.id.length
    const formRowData = [...Array(rowCount)].map((value, index) => {
      return { id: formData.row.id[index], systemCode: formData.row.systemCode[index], system: formData.row.system[index], caption:formData.row.caption[index],viewType:formData.row.viewType[index] }
    })

    setAgGridConfiguration({
      ...agGridConfiguration,
      showGrid: true,
      showPagination: formData.pagination,
      rowSelection: formData.rowSelection,
      colProps: colProps,
      rowData: formRowData[0].id !== '' ? formRowData : rowMockData,
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
