import { NewsCard } from '../components/NewsCard';
import {useEffect, useState} from "react";
import axios from "axios";
import {Header} from "../components/Header.jsx";
import {LoadingPage} from "./LoadingPage.jsx";
import {ErrorPage} from "./ErrorPage.jsx";
import {useLocation, useSearchParams} from "react-router-dom";

export function Home() {
    const searchParams = useSearchParams();
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [IsError, setIsError] = useState(false);

    const categoryFilter = searchParams[0].get('category');
    const searchFilter = searchParams[0].get('q');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const category = searchParams.get('category');

        let api_url = `https://089ea2db3fd3b3d0.mokky.dev/master`;
        if (categoryFilter) {
            api_url += `?category=${category}`;
        }
        if (searchFilter) {
            api_url += categoryFilter ? `&title=*${searchFilter}` : `?title=*${searchFilter}`;
        }

        async function loadNews() {
            try {
                const response = await axios.get(api_url);
                setNewsData(response.data);
            } catch(error){
                console.log(error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }
        loadNews()
    }, [categoryFilter, searchFilter]);

    const getTitle = () => {
        const searchParams = new URLSearchParams(location.search);
        const category = searchParams.get('category')
        return category;
    };

    if (loading) {
        return <LoadingPage />;
    }

    if (IsError) {
        return <ErrorPage />;
    }

    return (
        <div className="app-container">
            <Header />
            <div className="category-header category-header--gray">
                {getTitle() ? `${getTitle()}` : 'Все новости'}
            </div>
            <main className="main-content">
                <div className="news-list">
                    {newsData.map((news) => (
                            <NewsCard key={news.id} id={news.id} title={news.title} date={news.date} category={news.category} />
                    ))}
                </div>
            </main>
        </div>
    )
}