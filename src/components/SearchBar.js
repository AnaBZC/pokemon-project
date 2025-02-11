import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query); 
    };
    

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px', 
                justifyContent: 'flex-end'
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px', 
                    color: '#ccc'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{
                    height: '56px', 
                }}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;