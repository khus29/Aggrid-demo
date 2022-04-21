import React, { useState } from "react";
import { useForm } from "react-hook-form";

//open issues 
//1. https://github.com/ag-grid/ag-grid/issues/3638

const AggridForm = ({ handleFormSubmit }) => {
    const [rowCount, setRowCount] = useState(1)
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        handleFormSubmit(data)
    }

    const addRowCount = () => {
        setRowCount(rowCount + 1)
    }

    const renderRow = (i) => {
        return (
            <div key={i}>
                <div>*************************************************************</div>
                id<input {...register(`row.id[${i}]`)} />
                System Code<input {...register(`row.systemCode[${i}]`)} />
                System<input {...register(`row.system[${i}]`)} />
                Caption<input {...register(`row.caption[${i}]`)}/>
                View Type<input {...register(`row.viewType[${i}]`)}/>

            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label>Show Pagination</label>
                <select {...register("pagination")}>
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
                <label>Enable Chart</label>
                <select {...register("chart")}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
                <label>Row selection</label>
                <select {...register("rowSelection")}>
                    <option value="single">single</option>
                    <option value="multiple">multiple</option>
                </select>

                <div>
                    <label>Column Definition</label>
                    <span className="mr-10"><input type='checkbox' {...register("col.id")} />Id</span>
                    <span className="mr-10"><input type='checkbox' {...register("col.systemCode")} />System Code</span>
                    <span className="mr-10"><input type='checkbox' {...register("col.system")} />System</span>
                    <span className="mr-10"><input type='checkbox' {...register("col.caption")} />Caption</span>
                    <span className="mr-10"><input type='checkbox' {...register("col.viewType")} />ViewType</span>
                </div>
                <div>
                    <label>Column properties</label>
                    <span className="mr-10"><input type='checkbox' {...register("col.sort")} />Sort</span>
                    <span className="mr-10"> <input type='checkbox' {...register("col.filter")} />Filter</span>
                    <span className="mr-10"><input type='checkbox' {...register("col.rowGroup")} />Row Group</span>
                </div>

                <label>Row Data</label>
                {[...Array(rowCount)].map((e, i) => renderRow(i))}
                <input type='hidden'  {...register("rowCount")} />

                <div><a className="button button-outline float-right" onClick={addRowCount}>Add rows</a></div>
                <br /><br /><br />
                <div><input className="button" type="submit" /></div>

            </fieldset>
        </form>
    )
}

export default AggridForm