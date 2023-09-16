import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import {Add} from "@mui/icons-material";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import FormControl from '@mui/joy/FormControl';
import { createData } from './Table';
import FoodIcon from '@material-ui/icons/Fastfood';
import HealthlIcon from '@material-ui/icons/LocalHospital';
import EducationIcon from '@material-ui/icons/School';
import TravelIcon from '@material-ui/icons/Explore';
import HouseIcon from '@material-ui/icons/House';
import OtherIcon from '@material-ui/icons/MoreHoriz';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';

export const options = [
    { label: 'Food', icon: <FoodIcon size="sm"/> },
    { label: 'Health', icon: <HealthlIcon size="sm"/> },
    { label: 'Education', icon: <EducationIcon size="sm"/> },
    { label: 'Travel', icon: <TravelIcon size="sm"/> },
    { label: 'Housing', icon: <HouseIcon size="sm"/>},
    { label: 'Other', icon: <OtherIcon size="sm"/> }
];

export function ViewOption({ option }) {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {option.icon}
            <span style={{ marginLeft: "8px" }}>{option.label}</span>
        </div>
    );
}

export function getObjectByLabel(labelToFind, optionsArray) {
    return optionsArray.find(option => option.label === labelToFind);
}


const NumericFormatAdapter = React.forwardRef(function NumericFormatAdapter(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
        />
    );
});

NumericFormatAdapter.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default function AddItem(props) {
    // Assuming you have access to props
    const { addNewRow } = props;
    const [open, setOpen] = React.useState(false);
    const [itemData, setItemData] = React.useState({
        item: '',
        date: '',
        price: '',
        description: '',
        category: ''
    });

    function handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission behavior
        setOpen(false);
        console.log('Item data:', itemData);
        console.log('Item category:', itemData.category);

        const newItem = createData(itemData.date, itemData.item, parseInt(itemData.price), itemData.category, itemData.description);
        console.log('newItem:', newItem);

        addNewRow(newItem);
    }

    return (
        <React.Fragment>
            {/* Simple Button */}
            <Button style={{  position: 'absolute', right: '20px', top: '10px'}}
                    variant="outlined"
                    color="neutral"  startDecorator={<Add />}
                    onClick={() => setOpen(true)}
            >
                Add Item
            </Button>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.surface',
                        }}
                    />
                    <React.Fragment>

                        <form
                            onSubmit={(handleSubmit)}
                        >
                            <div id="item" style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    ontSize="lg"
                                    fontWeight="lg"
                                    level="h4"
                                    sx={{ marginRight: '10px' }} // Add some margin between text and input
                                >
                                    Item:
                                </Typography>
                                <Input required
                                       placeholder="Type in here…"
                                       value={itemData.item}
                                       onChange={(e) => setItemData({ ...itemData, item: e.target.value })}
                                       endDecorator={
                                           <React.Fragment>
                                               <Divider orientation="vertical" />
                                               <Select
                                                   required
                                                   variant="plain"
                                                   value={itemData.category.value}
                                                   onChange={(e) => {
                                                       setItemData({ ...itemData, category: e.target.innerText });
                                                   }}
                                               >
                                                   {options.map((option, index) => (
                                                       <React.Fragment>
                                                           {index !== 0 ? (
                                                               <ListDivider role="none" inset="startContent" />
                                                           ) : null}
                                                           <Option value={option}>
                                                               <ListItemDecorator>
                                                                   {option.icon}
                                                               </ListItemDecorator>
                                                               {option.label}
                                                           </Option>
                                                       </React.Fragment>
                                                   ))}
                                               </Select>
                                           </React.Fragment>
                                       }/>
                            </div>
                            <div id="date" style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    ontSize="lg"
                                    fontWeight="lg"
                                    level="h4"
                                    sx={{ marginRight: '10px', marginTop: '20px' }} // Add some margin between text and input
                                >
                                    Date:
                                </Typography>
                                <Input
                                    required
                                    type="date"
                                    sx={{ marginTop: '20px' }}
                                    value={itemData.date}
                                    onChange={(e) => setItemData({ ...itemData, date: e.target.value })}
                                />
                            </div>
                            <div id="price" style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    ontSize="lg"
                                    fontWeight="lg"
                                    level="h4"
                                    sx={{ marginRight: '10px', marginTop: '20px' }} // Add some margin between text and input
                                >
                                    Price:
                                </Typography>
                                <FormControl>
                                    <Input
                                        required
                                        value={itemData.price}
                                        onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
                                        placeholder="Amount"
                                        slotProps={{
                                            input: {
                                                component: NumericFormatAdapter,
                                            },
                                        }}
                                        startDecorator={'₪'}
                                        sx={{ marginTop: '20px' }} />
                                </FormControl>
                            </div>
                            <div id="description" style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    ontSize="lg"
                                    fontWeight="lg"
                                    level="h4"
                                    sx={{ marginRight: '10px', marginTop: '20px' }} // Add some margin between text and input
                                >
                                    Description:
                                </Typography>
                                <FormControl>
                                    <Input
                                        required
                                        value={itemData.description}
                                        onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
                                        placeholder="Description"
                                        sx={{ marginTop: '20px' }} />
                                </FormControl>
                            </div>
                            <Stack sx={{ marginTop: '20px' }}>
                                <Button type="submit" style={{ backgroundColor: 'black', color: 'white' }} >Submit</Button>
                            </Stack>
                        </form>
                    </React.Fragment>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}