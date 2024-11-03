import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCar from './AddCar'
import UpdateCar from './UpdateCar'

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'brand', sort: 'asc', flex: 2, maxWidth: 150, minWidth: 50 },
        { field: 'model', flex: 2, maxWidth: 150, minWidth: 50 },
        { field: 'color', flex: 2, maxWidth: 150, minWidth: 50 },
        { field: 'fuel', flex: 2, maxWidth: 150, minWidth: 50 },
        { field: 'modelYear', headerName: "Year", flex: 2, maxWidth: 150, minWidth: 50 },
        { field: 'price', flex: 2, maxWidth: 150, minWidth: 50 },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            flex: 1,
            maxWidth: 100,
            minWidth: 50,
            cellRenderer: params => <Button color="error" onClick={() => deleteCar(params.data._links.self.href)}>Delete</Button>
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            flex: 1,
            maxWidth: 100,
            minWidth: 50,
            cellRenderer: params => <UpdateCar updateCar={updateCar} currentCar={params.data} />
        },
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true
    };

   const autoSizeStrategy = {
        type: 'filCellContents',
    };

    const fetchCars = async () => {
        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
            const data = await response.json();
            setCars(data._embedded.cars);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    const deleteCar = async (url) => {
        const options = {
            method: 'DELETE'
        }

        try {
            if (confirm(`Delete car?`)) {
                const response = await fetch(url, options);
                fetchCars();
            }
        } catch (e) {
            console.error(e);
        }
    }

    const addCar = async (car) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        }

        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', options);
            const data = await response.json();
            console.log('Created:', data);
            fetchCars();
        } catch (e) {
            console.error(e);
        }
    }

    const updateCar = async (url, car) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Updated:', data);
            fetchCars();
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => fetchCars, []);

    return (

        <div className="CarList">
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{height: 600}}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                    accentedSort={true}
                />
            </div>
        </div>
    );

}

// style={{ width: "95%",height: 600,}}