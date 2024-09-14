'use client'
import Box from "@mui/material/Box";
import UnivBasicInfo from "@/app/UniversityList/[id]/UnivBasicInfo";
import UnivDetail from "@/app/UniversityList/[id]/UnivDetail";
import {useParams} from "next/navigation";
import axios from "axios";
import {Skeleton} from "@mui/material";
import {useState, useEffect} from "react";
import Container from "@mui/material/Container";
import BookBasicInfo from "@/app/BookList/[id]/BookBasicInfo";
import BookDetail from "@/app/BookList/[id]/BookDetail";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function BookPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const params = useParams();
    useEffect(() => {
        axios.get('/api/book/' + params.id)
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
            {loading ?
                <Skeleton
                    variant="rectangle"
                    width={900}
                    height={300}
                /> :
                <Box
                    width={900}
                    height={300}
                    sx={{textAlign: 'center'}}
                >
                    <img
                        src={data.pictureLink}
                        alt="collegeImage"
                        height={300}
                    />
                </Box>

            }
            <BookBasicInfo loading={loading} data={data} />
            <BookDetail loading={loading} data={data}/>
        </Container>
    );
}