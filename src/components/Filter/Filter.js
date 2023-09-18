import * as React from 'react';
import './Filter.css';
import { createFilter } from '../Table/Table';
import { MONTHS, YEARS } from "../../utils/consts";
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Divider from '@mui/joy/Divider';


/**
 * React component for filtering items data based on selected year and month.
 *
 * @param {object} props - The props passed to the component.
 * @param {function} props.filterTable - A callback function to filter the table data.
 * @returns {JSX.Element} The rendered filter form component.
 */
export default function Filter(props) {
    const { filterTable } = props;

    // State to store the selected values
    const [selectedYear, setSelectedYear] = React.useState(null);
    const [selectedMonth, setSelectedMonth] = React.useState(null);

    /**
     * Handles submission event -> trigger filter.
     *
     * @param {Event} event - The form submission event.
     */
    function handleSubmit(event) {
        event.preventDefault();

        // Use selectedYear and selectedMonth in your logic
        console.log('Selected Year:', selectedYear);
        console.log('Selected Month:', selectedMonth);

        const filterItem = createFilter(selectedYear, selectedMonth);
        filterTable(filterItem);
    }

    /**
     * Resets the selected year and month to their initial (null).
     */
    function handleReset() {
        setSelectedYear(null);
        setSelectedMonth(null);

        // Use the updated values in the callback function
        setSelectedYear((updatedYear) => {
            console.log('Selected Year:', updatedYear);
            setSelectedMonth((updatedMonth) => {
                console.log('Selected Month:', updatedMonth);

                // Create the filter item with the updated values
                const filterItem = createFilter(updatedYear, updatedMonth);
                filterTable(filterItem);

                return updatedMonth;
            });

            return updatedYear;
        });
    }

    return (
        <form onSubmit={handleSubmit} >
            <Stack direction="row" spacing={1}  divider={<Divider orientation="vertical"  />}>
                <Select
                    placeholder="Select a year"
                    value={selectedYear}
                    name="year"
                    sx={{ minWidth: 200 }}
                    onChange={(_, value) => setSelectedYear(value)}
                >
                    {YEARS.map((year) => (
                        <Option key={year} value={year}>
                            {year}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Select a month"
                    value={selectedMonth}
                    name="month"
                    sx={{ minWidth: 200 }}
                    onChange={(_, value) => setSelectedMonth(value)}
                >
                    {MONTHS.map((month) => (
                        <Option key={month} value={month}>
                            {month}
                        </Option>
                    ))}
                </Select>

                <Button type="submit" className="filter-button">
                    FILTER
                </Button>

                <Button type="button" className="showall-button" onClick={handleReset}>
                    SHOW ALL
                </Button>
            </Stack>
        </form>
    );
}