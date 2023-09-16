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
import IconButton from '@mui/joy/IconButton';
import Edit from '@mui/icons-material/Edit';

import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import FormControl from '@mui/joy/FormControl';
import { createData } from './Table';


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


export default function EditItem(props) {
    // Assuming you have access to props
    const { editRow, currentItemData } = props;
    const [open, setOpen] = React.useState(false);
    const [itemData, setItemData] = React.useState({
        item: currentItemData.item,
        date: currentItemData.date,
        price: currentItemData.price,
    });
    const [currency, setCurrency] = React.useState('dollar');

    function handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission behavior
        setOpen(false);
        console.log('Item data:', itemData);

        const editedItem = createData(itemData.date, itemData.item, parseInt(itemData.price));
        console.log('newItem:', editedItem);

        // Call the editRow function with the original row and the edited data
        editRow(currentItemData, editedItem);
    }

    return (
        <React.Fragment>
            {/* Simple Button */}
            <IconButton onClick={setOpen}>
                <Edit />
            </IconButton>
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
                                       onChange={(e) => setItemData({ ...itemData, item: e.target.value })}/>
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
                                        placeholder="Placeholder"
                                        slotProps={{
                                            input: {
                                                component: NumericFormatAdapter,
                                            },
                                        }}
                                        startDecorator={{ shekel: '₪', dollar: '$' }[currency]}
                                        endDecorator={
                                            <React.Fragment>
                                                <Divider orientation="vertical" />
                                                <Select
                                                    variant="plain"
                                                    value={currency}
                                                    onChange={(_, value) => setCurrency(value)}
                                                    slotProps={{
                                                        listbox: {
                                                            variant: 'outlined',
                                                        },
                                                    }}
                                                    sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
                                                >
                                                    <Option value="shekel">IL Shekel</Option>
                                                    <Option value="dollar">US Dollar</Option>
                                                </Select>
                                            </React.Fragment>
                                        }
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