'use client'
import DisplayList from "@/app/DisplayList";
import Container from "@mui/material/Container";
import BookSearchInput from "@/app/BookList/BookSearchInput";
import {useState} from "react";

export default function BookList() {
    const [url,setUrl]=useState("api/book")
    function handleSubmit(value,category){
        setUrl(`api/book/filter?name=${value}&category=${category}`)
    }
    return (
        <>
            <Container maxWidth="md">
                <BookSearchInput onSubmit={handleSubmit} />
            </Container>
            <DisplayList key={url} url={[url]} />
        </>

    )
}