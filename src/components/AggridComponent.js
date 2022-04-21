import React, {useMemo, useState, useRef, useEffect} from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {chartThemeOverrides, colsConfig} from './chartConfig'

const AggridComponent = ({ showPagination, rowSelection, rowData, enableChart, colProps}) => {
    const gridRef = useRef();
    const {filter, sort, rowGroup, id, systemCode, system,caption,viewType} = colProps
    const [gridApi, setGridApi] = useState(undefined)
    const [gridColApi, setGridColApi] = useState(undefined)
    const [colDefsData, setColDefsData] = useState([])
    
    useEffect(() => {
        const colDefs = []
        const cols = colsConfig(id, systemCode, system,caption,viewType)
        console.log(cols,'cols')
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
    }, [id, systemCode, system,caption,viewType])

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

    
    // useEffect(() => {
    //     gridColApi && gridColApi.applyColumnState({
    //         state: [
    //           { colId: 'id', rowGroup: rowGroup},
    //         ],
    //         defaultState: {
    //           pivot: true,
    //           rowGroup: false,
    //         }
    //       });
      
    // }, [gridColApi, rowGroup])

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
    
    console.log(colDefsData,'cold')
    colDefsData.map((col)=>{
        if(col.colId==='id'){
            // col.aggFunc  = params => {
            //     let total = 0;
            //     params.values.forEach(value => total += value/10);
            // return total;
            // }
            col.aggFunc = 'mySum'
        }
        if(col.colId==='system'){
            col.rowGroup = true
            col.pivot = true
        }
        if(col.colId==='systemCode'){
            col.rowGroup = true
            col.pivot = true
            // col.enablePivot = true
            // col.enableRowGroup = true

        }
        if(col.colId==='viewType'){
            // col.aggFunc = 'sum'
            col.pivot = true


        }
    })

    const gridOptions = {
        columnDefs : colDefsData,
        aggFuncs: {
            mySum: (params) => {
              let sum = 0;
              params.values.forEach((value) => (sum  = sum +  value/10));
              return sum;
            },
          },
    }


    const chartThemeOverridesProps = useMemo(() => {
    return chartThemeOverrides
    }, []);

    return <>
        <AgGridReact
        {...gridOptions}
            gridRef={gridRef}
            onGridReady={params => handleGridReady(params)}
            rowData={rowData}
            columnDefs={colDefsData}
            rowSelection={rowSelection}
            pivotMode={true}
            sideBar={true}
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