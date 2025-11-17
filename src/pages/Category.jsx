import { Header } from '../components/Header';
import { NewsCard } from '../components/NewsCard';
import {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "./LoadingPage.jsx";
import {ErrorPage} from "./ErrorPage.jsx";
import { useParams } from 'react-router-dom';

export function Category() {
    const { categoryName } = useParams();
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [IsError, setIsError] = useState(false);

    useEffect(() => {
        async function loadNews() {
            try {
                const { data } = await axios.get(`https://169943addf32007d.mokky.dev/news?category=${categoryName}`);
                setNewsData(data);
            } catch(error){
                console.log(error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }
        loadNews()
    }, [categoryName]);

    if (loading) {
        return <LoadingPage />;
    }

    if (IsError) {
        return <ErrorPage />;
    }

    return (
        <div className="app-container">
            <Header />
            <div className="category-header category-header--green">
                {categoryName}
            </div>
            <main className="main-content">
                <div className="news-list">
                    {newsData.map((news) => (
                        <NewsCard title={news.title} id={news.id} date={news.date} category={news.category} />
                    ))}
                </div>
            </main>
        </div>
    )
}