import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link, Skeleton} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
const week = ['日', '一', '二', '三', '四', '五', '六']
const date = new Date()
const examDate=new Date(`${date.getFullYear()}/12/26 8:30:0`)
export default function NewsCard() {

    const [loading, setLoading] = useState(true);
    const [data,setData] = useState(Array(3).fill({}));

    const myRandom = (arr, length) => {
        let newArr = []; // 组成的新数组初始化
        for (let i = 0; i < length; i++) {
            let index = Math.floor(Math.random() * arr.length);
            let item = arr[index];
            newArr.push(item);
            arr.splice(index, 1);
        }
        return newArr.reverse();
    }
    const getKey = (() => {
        let i = 0;
        return () => {
            return i++;
        }
    })();
    useEffect(() => {
        axios.get('/api/news')
            .then(function (response) {
                setData(myRandom(response.data, 3));
                // console.log(date.current);
                setLoading(false);
            })
    }, []);
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    今天是{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日
                    星期{week[date.getDay()]}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    距离考研还有 <Typography variant="h4"
                                             component="span">{Math.floor((examDate - date) / (24 * 3600 * 1000))}</Typography> 天
                </Typography>
                <Box height={52} />
                <Typography gutterBottom variant="h5" component="div">
                    今日考研资讯
                </Typography>
                {
                    data.map(news =>
                        <Typography gutterBottom variant="h6" component="div" key={getKey()}>
                            {
                                loading ?
                                    <Skeleton/> :
                                    <Link href={`/NewsList/${news.id}`}>{news.title}</Link>
                            }
                        </Typography>
                    )
                }
            </CardContent>
        </Card>
    );
}