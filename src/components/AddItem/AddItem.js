import React from "react";
import "./AddItem.css";
import { createItem } from '../Table/Table';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Button from "@mui/joy/Button";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Divider from '@mui/joy/Divider';
import {Add} from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import ListDivider from '@mui/joy/ListDivider';
import FormControl from '@mui/joy/FormControl';
import HouseIcon from '@material-ui/icons/House';
import FoodIcon from '@material-ui/icons/Fastfood';
import TravelIcon from '@material-ui/icons/Explore';
import OtherIcon from '@material-ui/icons/MoreHoriz';
import EducationIcon from '@material-ui/icons/School';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import HealthIcon from '@material-ui/icons/LocalHospital';

/**
 * Options for item categories including labels and icons.
 * @type {Array}
 */
export const options = [
    { label: "FOOD", icon: <FoodIcon size="sm" /> },
    { label: "HEALTH", icon: <HealthIcon size="sm" /> },
    { label: "EDUCATION", icon: <EducationIcon size="sm" /> },
    { label: "TRAVEL", icon: <TravelIcon size="sm" /> },
    { label: "HOUSING", icon: <HouseIcon size="sm" /> },
    { label: "OTHER", icon: <OtherIcon size="sm" /> },
];

/**
 * Adapts the NumericFormat component as a controlled input.
 *
 * @param {object} props - The props passed to the component.
 * @param {function} ref - The reference to the NumericFormat component.
 * @returns {JSX.Element} The adapted NumericFormat component.
 */
const NumericFormatAdapter = React.forwardRef(function NumericFormatAdapter(
    props,
    ref
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


/**
 * React component for adding a new item.
 *
 * @param {object} props - The props passed to the component.
 * @param {function} props.addNewItem - A callback function to add a new item.
 * @returns {JSX.Element} The rendered AddItem component.
 */
export default function AddItem(props) {
    const { addNewItem } = props;
    const [open, setOpen] = React.useState(false);
    const [itemData, setItemData] = React.useState({
        item: "",
        date: "",
        sum: "",
        description: "",
        category: "",
    });

    /**
     * Handles submission event -> trigger add new item.
     *
     * @param {Event} event - The form submission event.
     */
    function handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission behavior
        setOpen(false);
        const newItem = createItem(itemData.date, itemData.item, parseInt(itemData.sum), itemData.category, itemData.description);
        addNewItem(newItem);
        // Reset itemData to its initial state
        setItemData({
            item: '',
            date: '',
            sum: '',
            description: '',
            category: ''
        });
    }


    return (
        <div className="add-item-container">
            <Button
                className="add-item-button"
                variant="outlined"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Item
            </Button>
            <Modal
                className="modal"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Sheet className="sheet">
                    <form onSubmit={handleSubmit}>
                        <div className="form-input" >
                            <Typography
                                className="custom-form-label"
                            >
                                Item:
                            </Typography>
                            <Input
                                required
                                placeholder="Type in here…"
                                value={itemData.item}
                                onChange={(e) => setItemData({ ...itemData, item: e.target.value })}
                                endDecorator={
                                    <div>
                                        <Divider orientation="vertical" />
                                        <Select
                                            className="select-category"
                                            required
                                            variant="plain"
                                            placeholder="Choose category"
                                            value={itemData.category.value}
                                            onChange={(e) => {
                                                const selectedOption = e.target.textContent;
                                                setItemData({
                                                    ...itemData,
                                                    category: selectedOption,
                                                });
                                            }}
                                        >
                                            {options.map((option, index) => (
                                                <React.Fragment key={index}>
                                                    {index !== 0 ? (
                                                        <ListDivider role="none" inset="startContent" />
                                                    ) : null}
                                                    <Option value={option.label}>
                                                        <ListItemDecorator>
                                                            {option.icon}
                                                        </ListItemDecorator>
                                                        {option.label}
                                                    </Option>
                                                </React.Fragment>
                                            ))}
                                        </Select>
                                    </div>
                                }
                            />
                        </div>
                        <div className="form-input">
                            <Typography
                                className="custom-form-label"
                            >
                                Date:
                            </Typography>
                            <Input
                                required
                                type="date"
                                value={itemData.date}
                                onChange={(e) => setItemData({ ...itemData, date: e.target.value })}
                            />
                        </div>
                        <div className="form-input">
                            <Typography
                                className="custom-form-label"
                            >
                                Sum:
                            </Typography>
                            <FormControl>
                                <Input
                                    required
                                    value={itemData.sum}
                                    onChange={(e) => setItemData({ ...itemData, sum: e.target.value })}
                                    placeholder="Amount"
                                    slotProps={{
                                        input: {
                                            component: NumericFormatAdapter,
                                            name: "sum",
                                        },
                                    }}
                                    startDecorator={"$"}
                                />
                            </FormControl>
                        </div>
                        <div className="form-input">
                            <Typography
                                className="custom-form-label"
                            >
                                Description:
                            </Typography>
                            <FormControl>
                                <Input
                                    required
                                    value={itemData.description}
                                    onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
                                    placeholder="Description"
                                />
                            </FormControl>
                        </div>
                        <Stack className="form-button-stack">
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </form>
                </Sheet>
            </Modal>
        </div>
    );
}
