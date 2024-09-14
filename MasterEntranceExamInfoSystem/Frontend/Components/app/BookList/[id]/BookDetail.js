import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useParams} from "next/navigation";
import {Skeleton} from "@mui/material";
import axios from "axios";


export default function BookDetail({loading, data}) {
    const [text,setText]=React.useState(null);
    const [value, setValue] = React.useState('one');
    const params = useParams()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' , border: '1px solid', borderRadius:'15px', mb:3}}>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="one" label="图书详情"/>
                    <Tab value="two" label="评论" />
                </TabList>
                <TabPanel value='one'>
                        {
                            loading?
                                <Skeleton variant="rounded" width="100%" height={100}/>:
                                <Typography variant='body1' paragraph gutterBottom>{data.content}</Typography>
                        }
                </TabPanel>
                <TabPanel value='two'>评论区</TabPanel>
            </TabContext>
        </Box>
    );
}