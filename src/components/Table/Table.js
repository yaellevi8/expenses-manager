import React, {useEffect, useState} from "react";
import './Table.css';
import Filter from "../Filter/Filter";
import AddItem from "../AddItem/AddItem";
import ExpenseCounter from "../ExpenseCounter/ExpenseCounter";
import {addCost, deleteCost, getAllCosts, openCostsDB} from "../../idb";
import Card from "@mui/joy/Card";
import Table from '@mui/joy/Table';
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from '@mui/joy/ButtonGroup';
import Delete from '@mui/icons-material/Delete';
import HouseIcon from "@material-ui/icons/House";
import FoodIcon from "@material-ui/icons/Fastfood";
import TravelIcon from "@material-ui/icons/Explore";
import OtherIcon from "@material-ui/icons/MoreHoriz";
import EducationIcon from "@material-ui/icons/School";
import HealthIcon from "@material-ui/icons/LocalHospital";


/**
 * Icon expense categories.
 * @type {object}
 */
const icons = {
        Food: <FoodIcon size="sm"/>,
        Health: <HealthIcon size="sm"/>,
        Education: <EducationIcon size="sm"/>,
        Travel: <TravelIcon size="sm"/>,
        Housing: <HouseIcon size="sm"/>,
        Other: <OtherIcon size="sm"/>,
    };


/**
 * Creates a new item object with the given properties.
 *
 * @param {string} date - The date associated with the item.
 * @param {string} item - The name of the item.
 * @param {number} price - The price of the item.
 * @param {string} category - The category of the item.
 * @param {string} description - A description of the item.
 * @returns {object} A data object containing date, item, price, category, and description.
 */
export function createItem(date, item, price, category, description) {
    return { date, item, price, category, description };
}

/**
 * Creates a new filter object with the specified year and month.
 *
 * @param {number|null} year - The year to filter by (or null to ignore).
 * @param {number|null} month - The month to filter by (or null to ignore).
 * @returns {object} A filter object containing year and month properties.
 */
export function createFilter(year, month) {
    return { year, month };
}

export default function StyledTable() {
    const [db, setDb] = useState(null);
    const [filter, setFilter] =  useState(null);
    const [rowData, setRowData] =  useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    /**
     * This useEffect hook is responsible for opening the IndexedDB database.
     * It sets the 'db' state with the opened database if successful, and logs an error message if there's an issue.
     *
     * @effect
     * @param {function} openCostsDB - A function that opens the IndexedDB database.
     * @param {function} setDb - A state setter function for the 'db' state, used to store the database instance.
     */
    useEffect(() => {
        openCostsDB()
            .then((database) => {
                setDb(database);
            })
            .catch((error) => {
                console.error('Error opening database:', error);
            });
    }, []);

    /**
     * This useEffect hook is responsible for fetching data from the IndexedDB database based on the provided filter.
     * It triggers data fetching when either the 'db' or 'filter' state changes.
     *
     * @effect
     * @param {object|null} db - The IndexedDB database instance.
     * @param {object|null} filter - The filter object used to filter the data.
     * @param {function} fetchDataFromDatabase - A function that fetches data from the database.
     * @param {function} setRowData - A state setter function for updating the component's data state.
     */
    useEffect(() => {
        // Check if the database is available
        if (db) {
            fetchDataFromDatabase(db, filter)
                .then((filteredData) => {
                    // Update the component state with the filtered data
                    setRowData(filteredData);
                    console.log('rowData:', { rowData });
                })
                .catch((error) => {
                    console.error('Error fetching data from IDB:', error);
                });
        }
    }, [db, filter]);

    /**
     * This useEffect hook is responsible for calculating the total price of items and updating the 'totalPrice' state.
     * It triggers the calculation whenever the 'rowData' state changes.
     *
     * @effect
     * @param {array} rowData - An array containing the component's data, each item having a 'price' property.
     * @param {function} setTotalPrice - A state setter function for updating the 'totalPrice' state.
     */
    useEffect(() => {
        // Calculate total price
        const sum = rowData.reduce(
            (accumulator, currentRow) => accumulator + currentRow.price,
            0
        );
        setTotalPrice(sum);
    }, [rowData]);


    /**
     * Fetches data from the database and applies filtering based on the provided filter.
     *
     * @param {IDBDatabase} database - The IndexedDB database instance.
     * @param {object} filter - The filter object used to filter the data.
     * @returns {Promise<Array>} A Promise that resolves to an array of filtered data.
     */
    const fetchDataFromDatabase = (database, filter) => {
        return getAllCosts(database)
            .then((data) => {
                // Apply filtering logic based on the filter
                return filterDataByFilter(filter, data); // Return the filtered data
            });
    };

    /**
     * Applies a filter to the data table and updates the filter state.
     *
     * @param {object} filter - The filter object used to filter the data table.
     */
    const filterTable = (filter) => {
        console.log('Filter in progress');
        setFilter(filter);
    };

    /**
     * Filters data based on a provided filter object.
     *
     * @param {object} filter - The filter object used to filter the data.
     * @param {array} data - The data to be filtered.
     * @returns {array} - The filtered data.
     */
    function filterDataByFilter(filter, data) {
        // If filter is null or undefined, return all data
        console.log('filter:', filter);
        if (!filter || (filter.year === null && filter.month === null)) {
            return data;
        }

        // Apply filtering logic based on your filter object
        return data.filter((row) => {
            const dateObject = new Date(row.date);
            const rowYear = dateObject.getFullYear();
            const rowMonth = dateObject.getMonth() + 1;

            if (filter.year === null && filter.month !== null) {
                // Filter by month when year is null
                return rowMonth === filter.month;
            } else if (filter.year !== null && filter.month === null) {
                // Filter by year when month is null
                console.log('row year:', rowYear);
                console.log('row year:', rowYear === filter.year);
                return rowYear === filter.year;
            } else if (rowYear === filter.year && rowMonth === filter.month) {
                // Filter by both year and month when both are specified
                return true;
            }

            return false;
        })
    }

    /**
     * Adds a new item to the database and updates the component state.
     *
     * @param {object} newItem - The new item to be added.
     */
    const addNewItem = (newItem) => {
        // Add data to IndexedDB
        addCost(db, newItem)
            .then(() => {
                // Update the component state with the newly added data
                setRowData((prevRowData) => [...prevRowData, newItem]);

                // Fetch data from database for row id
                if (db) {
                    fetchDataFromDatabase(db, filter)
                        .then((filteredData) => {
                            // Update the component state with the filtered data
                            setRowData(filteredData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from IDB:', error);
                        });
                }
            })
            .catch((error) => {
                // Handle and log any errors that occur during the addition process
                console.error('Error adding cost:', error);
            });
    };

    /**
     * Deletes a specific item from the database and updates the component state.
     *
     * @param {object} itemToDelete - The item to be deleted.
     */
    const deleteItem = (itemToDelete) => {
        console.log('delete:', itemToDelete);

        // Get the record id from itemToDelete
        const recordIdToDelete = itemToDelete.id;
        console.log('recordIdToDelete: ', recordIdToDelete);
        console.log('rowToDelete: ', itemToDelete);

        // Use the 'deleteCost' function to delete the record in the database
        deleteCost(db, recordIdToDelete)
            .then(() => {
                console.log('db: ', getAllCosts(db));

                // Update the component state to remove the deleted record
                setRowData((prevRowData) =>
                    prevRowData.filter((row) => row.id !== recordIdToDelete)
                );
                console.log('Record deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting record:', error);
            });
    };

    return (
        <div className="expense-counter">
            <ExpenseCounter totalPrice={totalPrice} />
            <Card className="expense-card">
                <Typography className="custom-typography">
                    Expenses
                </Typography>
                <ButtonGroup>
                    <AddItem addNewItem={addNewItem} />
                    <Filter filterTable={filterTable} />
                </ButtonGroup>
                <Table variant="outlined" aria-label="simple table" className="table">
                    <thead>
                    <tr>
                        <th style={{ width: '15%' }}>Date</th>
                        <th style={{ width: '20%' }}>Item</th>
                        <th style={{ width: '20%' }}>Price</th>
                        <th style={{ width: '15%' }}>Category</th>
                        <th style={{ width: '20%' }}>Description</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {rowData.map((row, index) => (
                        <tr key={index} className="table-content">
                            <td>{row.date}</td>
                            <td className="overflow-cell">{row.item}</td>
                            <td className="overflow-cell">{row.price} $</td>
                            <td>
                                <div className="table-cell">
                                    {icons[row.category]}
                                    <span className="category-label">{row.category}</span>
                                </div>
                            </td>
                            <td className="overflow-cell">{row.description}</td>
                            <td>
                                <ButtonGroup
                                    size="sm"
                                    variant="soft"
                                    buttonFlex={1}
                                    aria-label="radius button group"
                                    className="button-group"
                                >
                                    <IconButton color="danger" onClick={() => deleteItem(row)}>
                                        <Delete />
                                    </IconButton>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}
