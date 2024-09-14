'use client';
import {Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from '@mui/material/Pagination';
import Container from "@mui/material/Container";

export default function NewsList({url = 'api/news'}) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageItemCount = 7;
    const dataDisplayed = useRef([]);
    const getKey = (() => {
        let i = 0;
        return () => {
            return i++;
        }
    })();
    const data = useRef(Array(pageItemCount).fill(null).map(() => (
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
    useEffect(() => {
        axios.get(url)
            .then(function (response) {
                data.current = response.data;
                dataDisplayed.current = data.current.slice(0, pageItemCount);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <Container maxWidth="md">
            <List>
                {
                    loading ?
                        data.current :
                        dataDisplayed.current.map(
                            item => (
                                <div key={item.id}>
                                    <ListItem>
                                        <ListItemButton onClick={() => {
                                            window.location.href = `NewsList/${item.id}`;
                                        }}>
                                            <ListItemText primary={item.title} secondary={item.timestamp}/>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider/>
                                </div>
                            )
                        )
                }
            </List>
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