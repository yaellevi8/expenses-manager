import React, { useState, useEffect } from "react";
import Card from "@mui/joy/Card";
import Table from '@mui/joy/Table';
import Typography from "@mui/joy/Typography";
import AddItem, {CustomOption} from "./AddItem";
import EditItem from "./EditItem";
import Filter from "./Filter";
import ExpenseCounter from "./ExpenseCounter";
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import IconButton from "@mui/joy/IconButton";
import Delete from '@mui/icons-material/Delete';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Star from '@mui/icons-material/Star';
import options from "./AddItem";
import getObjectByLabel from "./AddItem";
import ViewOption from "./AddItem";
import {openCostsDB, getAllCosts, addCost, updateCost, deleteCost} from "../idb";
import {MONTHS} from "../utils/consts";
import FoodIcon from "@material-ui/icons/Fastfood";
import HealthlIcon from "@material-ui/icons/LocalHospital";
import EducationIcon from "@material-ui/icons/School";
import TravelIcon from "@material-ui/icons/Explore";
import HouseIcon from "@material-ui/icons/House";
import OtherIcon from "@material-ui/icons/MoreHoriz";


const icons = {
        Food: <FoodIcon size="sm"/>,
        Health: <HealthlIcon size="sm"/>,
        Education: <EducationIcon size="sm"/>,
        Travel: <TravelIcon size="sm"/>,
        Housing: <HouseIcon size="sm"/>,
        Other: <OtherIcon size="sm"/>,
    };

export function createData(date, item, price, category, description) {
    return { date, item, price, category, description }; // Add isStarred property
}

export function createFilter(year, month) {
    return { year, month }; // Add isStarred property
}

export default function StyledTable() {
    const [rowData, setRowData] =  useState([]);
    const [filter, setFilter] =  useState(null);
    const [orderDirection, setOrderDirection] = useState("asc");
    const [totalPrice, setTotalPrice] = useState(0);
    const [db, setDb] = useState(null);

    const fetchDataFromDatabase = (database, filter) => {
        return getAllCosts(database)
            .then((data) => {
                // Apply filtering logic based on the filter
                const filteredData = filterDataByFilter(filter, data);
                return filteredData; // Return the filtered data
            });
    };

    useEffect(() => {
        openCostsDB()
            .then((database) => {
                setDb(database);
            })
            .catch((error) => {
                console.error('Error opening database:', error);
            });
    }, []);


    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.slice().sort((a, b) =>
                    a.price > b.price ? 1 : b.price > a.price ? -1 : 0
                );
            case "desc":
                return arr.slice().sort((a, b) =>
                    a.price < b.price ? 1 : b.price < a.price ? -1 : 0
                );
        }
    };

    const handleSortRequest = () => {
        setRowData(sortArray(rowData, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };

    const filterTable = (filter) => {
        console.log('Filter in progress');
        setFilter(filter);
    };

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


    function filterDataByFilter(filter, data) {
        // If filter is null or undefined, return all data
        console.log('filter:', filter);
        if (!filter) {
            return data;
        }

        // Apply filtering logic based on your filter object
        // For example, you can filter by year and month
        const  filteredData =  data.filter((row) => {

            const dateObject = new Date(row.date);


            const rowYear = dateObject.getFullYear();
            const rowMonth = dateObject.getMonth() + 1;

            console.log('dateObject:', rowYear);
            console.log('dateObject:', filter.year);
            console.log('dateObject:', dateObject.getMonth() + 1);
            console.log('dateObject:',  rowMonth);
            console.log('------------------');

            if (rowYear === filter.year && rowMonth === filter.month) {
                return true;
            }
            return false;
        });

        return filteredData

    }
    const addNewRow = (newRow) => {
        // Use a function like 'addCost' to add data to your IndexedDB
        // Replace 'addCost' with your actual IDB function
        addCost(db, newRow)
            .then(() => {
                // Update the component state with the newly added data
                setRowData((prevRowData) => [...prevRowData, newRow]);

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
                console.error('Error adding cost:', error);
            });
    };

    const editRow = (originalRow, editedRow) => {
        // Use the callback function to access the updated rowData
        const updatedRowData = rowData.map((row) => {
            if (row === originalRow) {
                // Update the original row with the edited data
                return { ...row, ...editedRow }; // Use 'row' instead of 'originalRow'
            }
            return row;
        });

        // Use the 'updateCost' function to update the record in the database
        updateCost(db, { ...originalRow, ...editedRow }) // Use 'originalRow' with 'editedRow'
            .then(() => {
                // Update the component state with the edited data
                setRowData(updatedRowData);
                console.log('Cost updated successfully');
            })
            .catch((error) => {
                console.error('Error updating cost:', error);
            });
    };

    const toggleStar = (row) => {
        // Create a copy of the row with the updated 'isStarred' property
        const updatedRow = { ...row, isStarred: !row.isStarred };

        // Use the 'updateCost' function to update the record in the database
        updateCost(db, updatedRow)
            .then(() => {
                // Update the component state with the edited data
                setRowData((prevRowData) => {
                    return prevRowData.map((r) => {
                        if (r === row) {
                            return updatedRow;
                        }
                        return r;
                    });
                });
                console.log('Star status updated successfully');
            })
            .catch((error) => {
                console.error('Error updating star status:', error);
            });
    };

    const deleteRow = (rowToDelete) => {
        console.log('delete:', rowToDelete);
        // Use the callback function to access the updated rowData
        // Assuming there's an 'id' property in your data that uniquely identifies each record
        const recordIdToDelete = rowToDelete.id;
        console.log('recordIdToDelete: ', recordIdToDelete);
        console.log('rowToDelete: ', rowToDelete);

        // Use the 'deleteCost' function to delete the record in the database
        deleteCost(db, recordIdToDelete)
            .then(() => {
                console.log('db: ', db);
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

    useEffect(() => {
        // Calculate total price
        const sum = rowData.reduce(
            (accumulator, currentRow) => accumulator + currentRow.price,
            0
        );
        setTotalPrice(sum);
    }, [rowData]);

    return (
        <div style={{margin: 'auto'}}>
            <ExpenseCounter totalPrice={totalPrice}/>
            <Card variant="outlined" sx={{ marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px'}}>
                <Typography ontSize="lg" fontWeight="lg" level="h4">
                    Expenses
                </Typography>
                <ButtonGroup >
                    <AddItem addNewRow={addNewRow}/>
                    <Filter filterTable={filterTable}/>
                </ButtonGroup>
                <Table variant="outlined" aria-label="simple table" sx={{ margin: 'auto' }}>
                    <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Date</th>
                        <th style={{ width: '20%' }}>Item</th>
                        <th style={{ width: '20%' }}>Price</th>
                        <th style={{ width: '20%' }}>Category</th>
                        <th style={{ width: '20%' }}>Description</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {rowData.map((row) => (
                        <tr key={row.item}>
                            <td>{row.date}</td>
                            <td>{row.item}</td>
                            <td>{row.price} ₪</td>
                            <td> <div style={{ display: "flex", alignItems: "center" }}>
                                    {icons[row.category]}
                                    <span style={{ marginLeft: "8px" }}>{row.category}</span>
                                </div></td>
                            <td>{row.description}</td>
                            <td>
                                <ButtonGroup size="sm" variant="soft"
                                             buttonFlex={1}
                                             aria-label="radius button group"
                                             sx={{
                                                 p: 0.7,
                                                 width: 100,
                                                 maxWidth: '100%',
                                                 resize: 'horizontal',
                                                 marginLeft: 'auto',
                                                 '--ButtonGroup-radius': '40px'
                                             }}>
                                    {/*<IconButton color="warning" onClick={() => toggleStar(row)}>*/}
                                    {/*    {row.isStarred ? <Star/> : <StarOutlineIcon />}*/}
                                    {/*</IconButton>*/}
                                    {/*<EditItem editRow={editRow} currentItemData={row}/>*/}
                                    <IconButton color="danger" onClick={() => deleteRow(row)}>
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
