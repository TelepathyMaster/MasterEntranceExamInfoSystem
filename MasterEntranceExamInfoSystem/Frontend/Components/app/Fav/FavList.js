'use client';
import {Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from '@mui/material/Pagination';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import cookie from "react-cookies";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

export default function FavList({url}) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const pageItemCount = 7;
    const dataDisplayed = useRef([]);
    const getKey = (() => {
        let i = 0;
        return () => {
            return i++;
        }
    })()
    const data = useRef([])
    const skeletonData = useRef(Array(pageItemCount).fill(null).map(() => (
        <div key={getKey()}>
            <ListItem>
                <ListItemAvatar>
                    <Skeleton variant="circular">
                        <Avatar/>
                    </Skeleton>
                </ListItemAvatar>
                <ListItemText>
                    <Skeleton/>
                </ListItemText>
            </ListItem>
            <Divider/>
        </div>
    )));

    const handleChange = (event, value) => {
        dataDisplayed.current = data.current.slice((value - 1) * pageItemCount,
            value * pageItemCount);
        setPage(value);
    };
    const handleDelete = (e, item) => {
        let url = ''
        if (item.schoolCode === undefined)
            url = `/api/fav/existItem/book/${cookie.load('userId')}/${item.id}`
        else url = `/api/fav/existItem/university/${cookie.load('userId')}/${item.id}`
        axios.get(url)
            .then(response => {
                return axios.delete(`/api/fav/${response.data[0].id}`)
            })
            .then(response => {
                setSnackbarOpen(true)
                setLoading(true)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        Promise.all(url.map((endpoint) => axios.get(endpoint))).then(
            (response) => {
                data.current = response.flatMap(obj => obj.data)
                dataDisplayed.current = data.current.slice(0, pageItemCount)
                setLoading(false)
            }
        );
    }, [loading]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    return (
        <Container maxWidth="md">
            <List>
                {
                    loading ?
                        skeletonData.current :
                        dataDisplayed.current.map(
                            item => (
                                <div key={getKey()}>
                                    <ListItem>
                                        <ListItemButton onClick={() => {
                                            if (item.schoolCode === undefined)
                                                window.location.href = `BookList/${item.id}`;
                                            else window.location.href = `UniversityList/${item.id}`;
                                        }}>
                                            <ListItemAvatar>
                                                <Avatar alt="Undefined Avatar"
                                                        src={item.pictureLink}/>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name}/>
                                        </ListItemButton>
                                        <Button onClick={(e) => handleDelete(e, item)}><DeleteIcon/></Button>
                                    </ListItem>
                                    <Divider/>
                                </div>
                            )
                        )
                }
            </List>
            <Snackbar open={snackbarOpen} autoHideDuration={1000}
                      onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                >
                    取消收藏成功
                </Alert>
            </Snackbar>
            {
                loading ?
                    <Skeleton>
                        <Pagination/>
                    </Skeleton> :
                    <Stack alignItems="center">
                        <Pagination
                            color="primary"
                            count={Math.ceil(data.current.length / pageItemCount)}
                            page={page}
                            onChange={handleChange}
                            sx={{margin: 2}}
                        />
                    </Stack>
            }
        </Container>
    );
}