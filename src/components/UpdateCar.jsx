import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

import CarDialogContent from './CarDialogContent'

export default function UpdateCar( { updateCar, currentCar }) {

    const [car, setCar] = useState(currentCar);
    const [open, setOpen] = useState(false);

    const url = currentCar._links.self.href;

    const handleClickOpen = () => {
        console.log(car)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        console.log(car);
        updateCar(url, car);
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Update car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}