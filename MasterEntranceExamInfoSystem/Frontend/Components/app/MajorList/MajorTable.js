import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import {Link, Skeleton, Stack} from "@mui/material";
import Pagination from "@mui/material/Pagination";

export default function MajorTable({url}) {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const pageItemCount = 10
    const rowDisplayed = useRef([])
    const data = useRef(null)
    const handleChange = (event, value) => {
        rowDisplayed.current = data.current.slice((value - 1) * pageItemCount,
            value * pageItemCount);
        setPage(value);
    }
    const getKey = (() => {
        let i = 0;
        return () => {
            return i++;
        }
    })()
    useEffect(() => {
        axios.get(url)
            .then(function (response) {
                data.current = response.data;
                rowDisplayed.current = data.current.slice(0, pageItemCount);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    return (
        <Container maxWidth='lg'>
            {
                loading?
                    <Skeleton variant="rounded" height={400} />:
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>招生单位</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>专业</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>研究方向</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>学习方式</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>拟招生人数</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>考试范围</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowDisplayed.current.map((row) => (
                                    <TableRow
                                        key={getKey()}
                                    >
                                        <TableCell>{row.university}</TableCell>
                                        <TableCell>{row.major}</TableCell>
                                        <TableCell>{row.researchField}</TableCell>
                                        <TableCell>{row.studyMode}</TableCell>
                                        <TableCell>{row.admissionTarget}</TableCell>
                                        <TableCell><Link href={`/MajorList/${row.id}`}>查看</Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
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