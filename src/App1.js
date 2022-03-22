import React, { useEffect, useState, useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'


function App() {
  const gridRef = useRef(null)
  const gridRef2 = useRef(null)

  const [gridApi, setGridApi] = useState(undefined)
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [price, setPrice] = useState("")

  const [showGrid, setShowGrid] = useState(false)

  const [colDefs, setColDefs] = useState([
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true }
  ])

  const [colDefs1, setColDefs1] = useState([
    { field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true }
  ])

  const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Boxter', price: 35000 },
    { make: 'Porche', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 35000 }
  ])

  const [rowData1, setRowData1] = useState([
    { make: 'Toyota_new', model: 'Boxter', price: 35000 },
    { make: 'Porche_new', model: 'Celica', price: 35000 },
    { make: 'Ford_new', model: 'Mondeo', price: 35000 }
  ])

  // useEffect(() => {
  //   fetch('https://ag-grid.com/example-assets/row-data.json').then(response => response.json()).then(data => setRowData(data))
  // }, [])

  const autoGroupColDef = useMemo(() => ({ field: 'model', cellRendererParams: { checkbox: true } }), [])

  const getSelectedRowData = () => {
    const selectedodes = gridRef2.current.api.getSelectedNodes()

    const selectedData = selectedodes.map(node => node.data)
    rowData.push(selectedData)
    setRowData(rowData)
    console.log('rowData11**', rowData)

    setShowGrid(true)

    //addNewRow(selectedData)
  }

  const removePrice = () => {
    const updatedColDefs = colDefs.slice(1)
    setColDefs(updatedColDefs)
    if (gridApi) {
      gridApi.sizeColumnsToFit()
    }
  }

  const addNewRow = (data) => {
    console.log('gridApi**', gridApi)

    if (gridApi) {
      console.log('Adding**')
      gridApi.applyTransaction({ add: data })
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    setShowGrid(true)
    console.log('submitted', `${make}, ${model}, ${price}`)
    const newData = [{
      make: make,
      model: model,
      price: price
    }]
    addNewRow(newData)
  }

  const handleGridReady = (params) => {
    console.log('making ready**')

    setGridApi(params.api)
    params.api.sizeColumnsToFit()
    console.log('rowData**', rowData)
    console.log('gridApi', params)

    rowData && addNewRow(rowData)
  }

  return (
    <div className='ag-theme-alpine'>
      <div>
        <h1>Add new row</h1>
        <form onSubmit={submitForm}>
          <label>Enter Make:
            <input
              type="text"
              onChange={(e) => setMake(e.target.value)}
            />
          </label>
          <label>Enter Model:
            <input
              type="text"
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
          <label>Enter Price:
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
        <p></p>
      </div>
      <div>
        <button onClick={removePrice}>Remove Price</button>
        <button onClick={getSelectedRowData}>Add selected</button>
      </div>
      <p></p>

      <div style={{ height: 400, width: 600 }}>
        {showGrid && <AgGridReact
          ref={gridRef}
          rowData={[]}
          columnDefs={colDefs}
          rowSelection='multiple'
          autoGroupColumnDef={autoGroupColDef}
          pagination={true}
          onGridReady={params => handleGridReady(params)}
          groupSelectsChildren={true} />}

        <p></p>
        <AgGridReact
          ref={gridRef2}
          rowData={rowData1}
          columnDefs={colDefs1}
          rowSelection='multiple'
          autoGroupColumnDef={autoGroupColDef}
          pagination={true}
          groupSelectsChildren={true} />
      </div>


    </div >
  )
}

export default App;
