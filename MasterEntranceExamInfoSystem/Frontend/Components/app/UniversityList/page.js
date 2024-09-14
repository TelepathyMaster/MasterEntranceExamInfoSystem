'use client'
import DisplayList from "@/app/DisplayList"
import SearchInput from "@/app/UniversityList/SearchInput";
import Container from "@mui/material/Container";
import {FormControl, InputLabel, Select, Stack} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

const provinceList = [
    "全部",
    "北京",
    "天津",
    "河北",
    "山西",
    "内蒙古",
    "辽宁",
    "吉林",
    "黑龙江",
    "上海",
    "江苏",
    "浙江",
    "安徽",
    "福建",
    "江西",
    "山东",
    "河南",
    "湖北",
    "湖南",
    "广东",
    "广西",
    "海南",
    "重庆",
    "四川",
    "贵州",
    "云南",
    "西藏",
    "陕西",
    "甘肃",
    "青海",
    "宁夏",
    "新疆",
    "香港",
    "澳门",
    "台湾"
]
const typeList = [
    "全部",
    "综合类",
    "理工类",
    "语言类",
    "财经类",
    "师范类",
    "医药类",
    "艺术类",
    "体育类",
    "农林类",
    "民族类",
    "政法类",
    "军事类",
    "其他",
]

export default function UniversityList() {
    const [feature, setFeature] = useState('')
    const [province, setProvince] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [type, setType] = useState('')
    const [url,setUrl]=useState("api/university")
    const handleFeatureChange = (event) => {
        setFeature(event.target.value)
    }
    function handleSubmit(t){
        setUrl(`api/university/filter?name=${t}&feature=${feature}&province=${province}&affiliation=${affiliation}&type=${type}`)
    }
    const handleProvinceChange = (event) => {
        setProvince(event.target.value)
    }
    const handleAffiliationChange = (event) => {
        setAffiliation(event.target.value)
    }
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }
    return (
        <>
            <Container maxWidth="md" sx={{my: 4}}>
                <SearchInput onSubmit={handleSubmit}/>
                <Stack direction="row" justifyContent="space-between">
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>院校所在地</InputLabel>
                        <Select
                            value={province}
                            label="province"
                            onChange={handleProvinceChange}
                        >
                            {provinceList.map(province =>
                                <MenuItem
                                    key={province}
                                    value={province}
                                >
                                    {province}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>院校属性</InputLabel>
                        <Select
                            value={feature}
                            label="feature"
                            onChange={handleFeatureChange}
                        >
                            <MenuItem value="全部">全部</MenuItem>
                            <MenuItem value="双一流">双一流</MenuItem>
                            <MenuItem value="其他">其他</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>院校类型</InputLabel>
                        <Select
                            value={type}
                            label="type"
                            onChange={handleTypeChange}
                        >
                            {typeList.map(type =>
                                <MenuItem
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>院校隶属</InputLabel>
                        <Select
                            value={affiliation}
                            label="affiliation"
                            onChange={handleAffiliationChange}
                        >
                            <MenuItem value="全部">全部</MenuItem>
                            <MenuItem value="教育部">教育部</MenuItem>
                            <MenuItem value="其他部委">其他部</MenuItem>
                            <MenuItem value="地方">地方</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Container>

            <DisplayList key={url} url={[url]}/>
        </>
    )
}