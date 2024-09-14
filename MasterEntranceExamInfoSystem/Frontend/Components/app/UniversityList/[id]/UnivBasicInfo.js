import Grid from '@mui/material/Unstable_Grid2';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useEffect, useRef, useState} from "react";
import {Skeleton} from "@mui/material";
import {useParams} from "next/navigation";
import cookie from "react-cookies";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function UnivBasicInfo({loading, data}) {
    const params = useParams();
    const [isMarked, setIsMarked] = useState(null);
    const favId = useRef(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    useEffect(() => {
        axios.get(`/api/fav/existItem/university/${cookie.load('userId')}/${params.id}`)
            .then(function (response) {
                setIsMarked(Boolean(response.data.length));
                if (response.data.length)
                    favId.current = response.data[0].id;
            })
            .catch(function (error) {
                console.log(error);
            })
    });
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    function handleClick() {
        const fav = {
            userId: cookie.load('userId'),
            itemId: params.id,
            type: 'university'
        }

        if(isMarked)
            axios.delete(`/api/fav/${favId.current}`)
                .then(function (){
                    setIsMarked(!isMarked);
                    setSnackbarText('取消收藏成功')
                    setSnackbarOpen(true)
                })
                .catch(function (error){
                    console.log(error);
                })
        else
            axios.post('/api/fav', fav)
            .then(function (){
                setIsMarked(!isMarked);
                setSnackbarText('收藏成功')
                setSnackbarOpen(true)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={3}
            sx={{
                my: 5,
                border: '1px solid',
                borderRadius: '15px'
            }}
        >
            <Grid md={6} textAlign='left'>
                <Typography variant='h5'>
                    院校基本信息
                </Typography>
            </Grid>
            <Grid md={6} textAlign='right'>
                {loading ?
                    <Skeleton variant='rounded'>
                        <Button variant='outlined'>
                            {isMarked ? '取消收藏' : '收藏院校'}
                        </Button>
                    </Skeleton> :
                    <Button variant='outlined' onClick={handleClick}>
                        {isMarked ? '取消收藏' : '收藏院校'}
                    </Button>
                }
            </Grid>
            <Grid md={12} textAlign='left'>
                <Typography variant="h6">
                    {loading ? <Skeleton/> : data.name}
                </Typography>
            </Grid>
            <Grid md={6}>
                <Typography variant="body1">
                    {loading ? <Skeleton/> : `院校编号：${data.schoolCode}`}
                </Typography>
            </Grid>
            <Grid md={6}>
                <Typography variant="body1">
                    {loading ? <Skeleton/> : `负责人：张三`}
                </Typography>
            </Grid>
            <Grid md={6}>
                <Typography variant="body1">
                    {loading ? <Skeleton/> : `院校电话：${data.phone}`}
                </Typography>
            </Grid>
            <Grid md={6}>
                <Typography variant="body1">
                    {loading ? <Skeleton/> : `院校地址：${data.address}`}
                </Typography>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={1000}
                      onClose={handleSnackbarClose}>
                <Alert

                    onClose={handleSnackbarClose}
                    severity="success"
                >
                    {snackbarText}
                </Alert>
            </Snackbar>
        </Grid>
    );
}