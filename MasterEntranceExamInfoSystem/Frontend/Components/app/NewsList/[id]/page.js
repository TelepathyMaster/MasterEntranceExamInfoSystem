'use client';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Divider, Skeleton} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "next/navigation";

export default function NewsDetail() {
    const params = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`/api/news/${params.id}`)
            .then(function (response) {
                setData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{textAlign: "center", mt: 3}}>
                {
                    loading?
                        <Skeleton />:
                        data.title
                }
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{m:3, whiteSpace: "pre-line", textIndent: "2rem"}}>
                {
                    loading?
                        <Skeleton />:
                        data.content
                }
            </Typography>
        </Container>
    );
}