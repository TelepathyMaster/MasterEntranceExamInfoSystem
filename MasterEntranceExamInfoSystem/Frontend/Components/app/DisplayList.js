'use client';
import {Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from '@mui/material/Pagination';
import Container from "@mui/material/Container";

export default function DisplayList({url}) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
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
    useEffect(() => {
        Promise.all(url.map((endpoint) => axios.get(endpoint))).then(
            (response) => {
                data.current = response.flatMap(obj => obj.data)
                dataDisplayed.current = data.current.slice(0, pageItemCount)
                setLoading(false)
            }
        );
    }, []);

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