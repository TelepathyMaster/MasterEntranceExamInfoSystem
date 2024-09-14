'use client'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Divider, Skeleton} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "next/navigation";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";

const staticData = [
    {
        tag: "招生单位",
        originalTag: "university",
        width: 6
    },
    {
        tag: "考试方式",
        originalTag: "examMode",
        width: 6
    },
    {
        tag: "院系所",
        originalTag: "faculty",
        width: 6
    },
    {
        tag: "专业",
        originalTag: "major",
        width: 6
    },
    {
        tag: "学习方式",
        originalTag: "studyMode",
        width: 6
    },
    {
        tag: "研究方向",
        originalTag: "researchField",
        width: 6
    },
    {
        tag: "指导老师",
        originalTag: "tutor",
        width: 6
    },
    {
        tag: "拟招人数",
        originalTag: "admissionTarget",
        width: 6
    },
    {
        tag: "是否接收退役大学生士兵专项计划考生报考",
        originalTag: "acceptSpecialProgram",
        width: 12
    },
    {
        tag: "备注",
        originalTag: "remark",
        width: 6
    }
]
export default function MajorDetail(){
    const [loading,setLoading]=useState(true)
    const [data,setData]=useState([])
    const params = useParams()
    useEffect(() => {
        axios.get('/api/major/' + params.id)
            .then(function (response) {
                response.data.examMode='统考'
                setData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);
    return (
        <Container maxWidth="md" sx={{ border: "1px solid", borderRadius: "30px", p: 4}}>
            {
                loading?
                    <Skeleton variant="rounded" height={600} />:
                    <Box>
                        <Typography variant="h4" gutterBottom textAlign="center">
                            考试范围详情
                        </Typography>
                        <br />
                        <Grid container spacing={2}>
                            {
                                staticData.map(item =>
                                    <Grid md={item.width} key={item.originalTag}>
                                        {`${item.tag}： ${data[item.originalTag]}`}
                                    </Grid>
                                )
                            }
                        </Grid>
                        <br/>
                        <Divider/>
                        <br/>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "bold"}}>政治</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>外语</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>业务课一</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>业务课二</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{data.politics}</TableCell>
                                        <TableCell>{data.foreignLanguage}</TableCell>
                                        <TableCell>{data.courseOne}</TableCell>
                                        <TableCell>{data.courseTwo}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
            }
        </Container>
    )
}