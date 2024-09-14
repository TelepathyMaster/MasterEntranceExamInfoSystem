import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import cookie from "react-cookies";
import {useEffect, useRef, useState} from "react";
import {ButtonGroup, Skeleton} from "@mui/material";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useCookies} from "react-cookie";

export default function RecommendationCard({initData}) {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [cookies, setCookie] = useCookies();

    const data = useRef([]);
    useEffect(() => {
        if (cookie.load('userId')){
            axios.get(`${initData.api}/${cookie.load('userId')}`)
                .then(function (response) {
                    data.current = response.data;
                    setLoggedIn(true);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        else {
            setLoading(false);
            setLoggedIn(false);
        };
    }, [cookies]);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    }

    function handlePrev() {
        setPage((page + 2) % data.current.length);
    }

    function handleNext() {
        setPage((page + 1) % data.current.length);
    }

    function handleClick() {
        if (loggedIn)
            window.location.href = `${initData.clickPrefix}/${data.current[page].id}`;
        else setSnackBarOpen(true);
    }

    return (
        <>
            {
                loading ?
                    <Card variant="outlined">
                        <Skeleton variant="rounded" height={200} width={392}/>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <Skeleton/>
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <Skeleton/>
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                <Skeleton/>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Skeleton variant="rounded" height={30} width={70}/>
                        </CardActions>
                    </Card> :
                    <Card variant="outlined">
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="200"
                            image={loggedIn ?
                                data.current[page].pictureLink :
                                initData.pictureLink
                            }
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {initData.title}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {
                                    loggedIn ?
                                        `${page+1}. ${data.current[page].name}` :
                                        initData.name
                                }
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {
                                    loggedIn ?
                                        data.current[page].content :
                                        initData.content
                                }
                            </Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent: "space-between"}}>
                            <Button size="small" onClick={handleClick}>了解更多</Button>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                <Button
                                    size="small"
                                    onClick={handlePrev}
                                    disabled={!loggedIn}
                                >
                                    <ArrowBackIcon/>
                                </Button>
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={!loggedIn}
                                >
                                    <ArrowForwardIcon/>
                                </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Card>

            }

            <Snackbar open={snackBarOpen} autoHideDuration={2500} onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="warning"
                >
                    访问服务前请先登录
                </Alert>
            </Snackbar>
        </>
    )
}