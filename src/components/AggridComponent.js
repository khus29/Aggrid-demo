import React, {useMemo, useState, useRef, useEffect} from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {chartThemeOverrides, colsConfig} from './chartConfig'

const AggridComponent = ({ showPagination, rowSelection, rowData, enableChart, colProps}) => {
    const gridRef = useRef();
    const {filter, sort, rowGroup, make, model, price} = colProps
    const [gridApi, setGridApi] = useState(undefined)
    const [gridColApi, setGridColApi] = useState(undefined)
    const [colDefsData, setColDefsData] = useState([])
    
    useEffect(() => {
        const colDefs = []
        const cols = colsConfig(make, model, price)
        cols.forEach(colItem => {
            if(colItem.show) {
                const matchedCol = colDefsData.find(o => o.field === colItem.key)
                if(matchedCol) {
                    colDefs.push(matchedCol)
                } else {
                    colDefs.push({ field: colItem.key})
                }
            }
        })
        setColDefsData(colDefs)
    }, [make, model, price])

    useEffect(() => {
        if(gridApi) {
            const columnDefnew = gridApi.getColumnDefs()
            columnDefnew.forEach(function (colDef, index) {
            colDef.filter = filter
            colDef.sortable = sort
            });
            setColDefsData(columnDefnew)
        } 
    }, [gridApi, sort, filter])

    useEffect(() => {
        gridColApi && gridColApi.applyColumnState({
            state: [
              { colId: 'make', rowGroup: rowGroup },
            ],
            defaultState: {
              pivot: true,
              rowGroup: false,
            }
          });
      
    }, [gridColApi, rowGroup])

    const handleGridReady = (params) => {
        setGridApi(params.api)
        setGridColApi(params.columnApi)
    }
       
    const chartThemes = useMemo(() => {
        return ['ag-pastel', 'ag-vivid'];
      }, []);

    const popupParent = useMemo(() => {
        return document.body;
    }, []);

    const chartThemeOverridesProps = useMemo(() => {
    return chartThemeOverrides
    }, []);

    return <>
        <AgGridReact
            gridRef={gridRef}
            onGridReady={params => handleGridReady(params)}
            rowData={rowData}
            columnDefs={colDefsData}
            rowSelection={rowSelection}
            pagination={showPagination}
            groupSelectsChildren={true}
            enableRangeSelection={true}
            enableCharts={enableChart}
            chartThemes={chartThemes}
            popupParent={popupParent}
            chartThemeOverrides={chartThemeOverridesProps}
        />
    </>
}

export default AggridComponent