'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useRef, useState} from "react";

export default function SearchInput({onSubmit,placeholder="搜索院校"}) {
    const [value,setValue]=useState('')
    function handleChange(e) {
        setValue(e.target.value)
    }
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', my: 3}}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={()=>onSubmit(value)}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}