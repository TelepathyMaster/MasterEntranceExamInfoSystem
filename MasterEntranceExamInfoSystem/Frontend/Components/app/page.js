'use client'
import * as React from 'react';
import Box from "@mui/material/Box";
import {register} from 'swiper/element/bundle';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import picOne from './static/1.png'
import picTwo from './static/2.png'
import picThree from './static/3.png'

register();
import Image from "next/image";
import NewsCard from "@/app/NewsCard";
import RecommendationCard from "@/app/RecommendationCard";

const univInitData={
    title: '今日院校推荐',
    name: '安徽大学',
    clickPrefix: 'UniversityList',
    pictureLink: 'https://www.ahu.edu.cn/_upload/column/00/2a/42/picture.jpg',
    api: `/api/university/getRecommendation`,
    content: '安徽大学(Anhui University)坐落于素有“三国故地、包拯家乡，江淮首郡、吴楚要冲”美誉的历史文化名城、安徽省省会合肥市。学校是国家“双一流”和“211工程”建设首批入列高校，是安徽省人民政府与教育部共建高校，是安徽省属重点综合性大学。'
}
const bookInitData={
    title: '今日图书推荐',
    name: '《张宇考研数学基础30讲》',
    clickPrefix: 'BookList',
    pictureLink: 'https://gw.alicdn.com/imgextra/i4/725677994/O1CN019iyJHP28vJ1XHdIPA_!!725677994.jpg',
    api: '/api/book/getRecommendation',
    content: '本书以考研命题所使用的所有题目源头为依据，精心挑选和编制了数百道题目。利于考生在复习过程中开拓思路，练习分析问题，解决问题的能力。本书内容包括高等数学（微积分）、线性代数、概率论与数理统计，题目类型有选择题、填空题、解答题构成。'

}
export default function IndexPage() {
    const pic=[picOne,picTwo,picThree];
    const getKey = (() => {
        let i = 0;
        return () => {
            return i++;
        }
    })();

    return <>
        <Box sx={{ m: '0 auto'}} maxWidth='lg' className='wrapper'>
            <Box className='slider'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        pic.map(item=>
                            <SwiperSlide key={getKey()}>
                                <Image
                                    src={item}
                                    alt='Picture'
                                    width={1200}
                                    height={300}
                                    priority
                                />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </Box>
            <RecommendationCard initData={univInitData} />
            <RecommendationCard initData={bookInitData} />
            <NewsCard />
        </Box>
    </>
}