'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useRef, useState} from "react";
import {Divider, FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function BookSearchInput({onSubmit,placeholder="搜索图书"}) {
    const [value,setValue]=useState('')
    const [category,setCategory]=useState('')
    function handleChange(e) {
        setValue(e.target.value)
    }
    function handleCategoryChange(e){
        setCategory(e.target.value)
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
            <FormControl sx={{minWidth: 80, mb: 0.7}} size="small" variant="standard">
                <InputLabel>类别</InputLabel>
                <Select
                    value={category}
                    label="category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="全部">全部</MenuItem>
                    <MenuItem value="政治">政治</MenuItem>
                    <MenuItem value="外语">外语</MenuItem>
                    <MenuItem value="业务课一">业务课一</MenuItem>
                    <MenuItem value="业务课二">业务课二</MenuItem>
                </Select>
            </FormControl>
            <Divider sx={{ height: 35, m: 1 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={()=>onSubmit(value,category)}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}