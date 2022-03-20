import React, { useState } from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

const AggridComponent = ({ showPagination, rowSelection, colDefs, rowData }) => {
    // const [colDefs1, setColDefs] = useState([
    //     { field: 'make', sortable: true, filter: true, checkboxSelection: true },
    //     { field: 'model', sortable: true, filter: true },
    //     { field: 'price', sortable: true, filter: true }
    // ])
    // const [rowData1, setRowData] = useState([
    //     { make: 'Toyota', model: 'Boxter', price: 35000 },
    //     { make: 'Porche', model: 'Celica', price: 35000 },
    //     { make: 'Ford', model: 'Mondeo', price: 35000 }
    // ])
    return <>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection={rowSelection}
            pagination={showPagination}
            groupSelectsChildren={true}
        />
    </>
}

export default AggridComponent