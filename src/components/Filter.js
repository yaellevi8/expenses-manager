import * as React from 'react';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import { MONTHS, YEARS } from "../utils/consts";
import { createFilter } from './Table';

export default function Filter(props) {
    const { filterTable } = props;

    // State to store the selected values
    const [selectedYear, setSelectedYear] = React.useState(YEARS[0]);
    const [selectedMonth, setSelectedMonth] = React.useState(MONTHS[0]);

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Use selectedYear and selectedMonth in your logic
        console.log('Selected Year:', selectedYear);
        console.log('Selected Month:', selectedMonth);

        const filterItem = createFilter(selectedYear, selectedMonth);
        filterTable(filterItem);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical"  />}>
                <Select
                    placeholder="Select a year"
                    name="year"
                    required
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
                    name="month"
                    required
                    sx={{ minWidth: 200 }}
                    onChange={(_, value) => setSelectedMonth(value)}
                >
                    {MONTHS.map((month) => (
                        <Option key={month} value={month}>
                            {month}
                        </Option>
                    ))}
                </Select>
                <Button type="submit"
                        variant="outlined"
                        color="neutral">Submit</Button>
            </Stack>
        </form>
    );
}