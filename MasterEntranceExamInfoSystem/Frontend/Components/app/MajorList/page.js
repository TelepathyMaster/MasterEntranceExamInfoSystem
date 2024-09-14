'use client'
import DisplayList from "@/app/DisplayList"
import SearchInput from "@/app/UniversityList/SearchInput";
import Container from "@mui/material/Container";
import {FormControl, InputLabel, Select, Stack} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import MajorTable from "@/app/MajorList/MajorTable";

const categoryList = {
    "全部":[],
    "军事学": ["全部","作战指挥保障", "军事后勤学", "军事思想与军事历史", "军事智能", "军事管理学", "军事装备学", "军事训练与管理", "军事训练学", "军兵种作战学", "军兵种作战指挥", "军队指挥学", "军队政治工作学", "后勤与装备保障", "国家安全学", "战时政治工作", "战略学", "联合作战学", "联合作战指挥"],
    "农学": ["全部","作物学", "兽医", "兽医学", "农业", "农业资源与环境", "园艺学", "林业", "林学", "植物保护", "水产", "环境科学与工程", "畜牧学", "科学技术史", "草学", "食品科学与工程"],
    "医学": ["全部","中医", "中医学", "中药", "中药学", "中西医结合", "临床医学", "公共卫生", "公共卫生与预防医学", "医学技术", "口腔医学", "基础医学", "护理", "护理学", "特种医学", "生物医学工程", "药学"],
    "历史学": ["全部","世界史", "中国史", "博物馆", "考古学"],
    "哲学": ["全部","哲学", "应用伦理"],
    "工学": ["全部","交通运输", "交通运输工程", "仪器科学与技术", "信息与通信工程", "光学工程", "公安技术", "兵器科学与技术", "农业工程", "冶金工程", "力学", "动力工程及工程热物理", "化学工程与技术", "土木工程", "土木水利", "地质资源与地质工程", "城乡规划", "城乡规划学", "安全科学与工程", "建筑", "建筑学", "控制科学与工程", "智能科学与技术", "机械", "机械工程", "材料与化工", "材料科学与工程", "林业工程", "核科学与技术", "水利工程", "测绘科学与技术", "环境科学与工程", "生物与医药", "生物医学工程", "生物工程", "电子信息", "电子科学与技术", "电气工程", "石油与天然气工程", "矿业工程", "管理科学与工程", "纺织科学与工程", "网络空间安全", "能源动力", "航空宇航科学与技术", "船舶与海洋工程", "计算机科学与技术", "设计学", "资源与环境", "软件工程", "轻工技术与工程", "遥感科学与技术", "集成电路科学与工程", "风景园林", "食品科学与工程"],
    "教育学": ["全部","体育", "体育学", "国际中文教育", "应用心理", "心理学", "教育", "教育学"],
    "文学": ["全部","中国语言文学", "出版", "外国语言文学", "新闻与传播", "新闻传播学", "翻译"],
    "法学": ["全部","中共党史党建学", "公安学", "政治学", "民族学", "法学", "法律", "知识产权", "社会学", "社会工作", "警务", "马克思主义理论"],
    "理学": ["全部","中药学", "公共卫生与预防医学", "力学", "化学", "地球物理学", "地理学", "地质学", "基础医学", "大气科学", "天文学", "心理学", "数学", "材料科学与工程", "海洋科学", "物理学", "环境科学与工程", "生态学", "生物医学工程", "生物学", "电子科学与技术", "科学技术史", "系统科学", "统计学", "药学", "计算机科学与技术"],
    "管理学": ["全部","会计", "信息资源管理", "公共管理", "公共管理学", "农林经济管理", "图书情报", "审计", "工商管理", "工商管理学", "工程管理", "旅游管理", "管理科学与工程"],
    "经济学": ["全部","保险", "国际商务", "应用经济学", "应用统计", "数字经济", "理论经济学", "税务", "统计学", "资产评估", "金融"],
    "艺术学": ["全部","戏剧与影视", "戏曲与曲艺", "美术与书法", "舞蹈", "艺术学", "设计", "设计学", "音乐"]
};

export default function MajorList() {
    const [feature, setFeature] = useState('')
    const [category, setCategory] = useState('')
    const [discipline, setDiscipline] = useState('')
    const [studyMode,setStudyMode]=useState('')
    const [disciplineList, setDisciplineList] = useState([])
    const [url,setUrl]=useState("api/major")
    const handleFeatureChange = (event) => {
        setFeature(event.target.value)
    }
    function handleSubmit(t){
        setUrl(`api/major/filter?name=${t}&category=${category}&discipline=${discipline}&feature=${feature}&studyMode=${studyMode}&doubleFirstClass=${feature==='双一流'?'true':'false'}`)
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
        setDisciplineList(categoryList[event.target.value])
    }
    const handleDisciplineChange = (event) => {
        setDiscipline(event.target.value)
    }
    const handleStudyModeChange = (event) => {
        setStudyMode(event.target.value)
    }
    return (
        <>
            <Container maxWidth="md" sx={{my: 4}}>
                <SearchInput onSubmit={handleSubmit} placeholder='搜索专业' />
                <Stack direction="row" justifyContent="space-between">
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>学科分类</InputLabel>
                        <Select
                            value={category}
                            label="category"
                            onChange={handleCategoryChange}
                        >
                            {Object.keys(categoryList).map(category =>
                                <MenuItem
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>一级学科</InputLabel>
                        <Select
                            value={discipline}
                            label="discipline"
                            onChange={handleDisciplineChange}
                        >
                            {disciplineList.map(discipline =>
                                <MenuItem
                                    key={discipline}
                                    value={discipline}
                                >
                                    {discipline}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>院校类型</InputLabel>
                        <Select
                            value={feature}
                            label="feature"
                            onChange={handleFeatureChange}
                        >
                            <MenuItem value="全部">全部</MenuItem>
                            <MenuItem value="自划线">自划线</MenuItem>
                            <MenuItem value="双一流">双一流</MenuItem>
                            <MenuItem value="其他">其他</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 160}} size="small">
                        <InputLabel>学习方式</InputLabel>
                        <Select
                            value={studyMode}
                            label="studyMode"
                            onChange={handleStudyModeChange}
                        >
                            <MenuItem value="全部">全部</MenuItem>
                            <MenuItem value="全日制">全日制</MenuItem>
                            <MenuItem value="非全日制">非全日制</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Container>

            <MajorTable key={url} url={[url]}/>
        </>
    )
}