import { Header } from '../components/Header';
import backIcon from '../../public/icons/backButton.svg';
import {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "./LoadingPage.jsx";
import {ErrorPage} from "./ErrorPage.jsx";
import {useParams} from "react-router-dom";
import { Comments } from '../components/Comments';

export function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [IsError, setIsError] = useState(false);

    useEffect(() => {
        async function loadNews() {
            try {
                const response = await axios.get(`https://089ea2db3fd3b3d0.mokky.dev/master/${id}`);
                setNews(response.data);
            } catch(error){
                console.log(error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }
        loadNews()
    }, [id]);

    const handleBack = () => {
        window.history.back();
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
            <div className="category-header category-header--red category-header--detail">
                <div className="content-container">
                    <button className="back-button" onClick={handleBack}>
                        <img src={backIcon} alt="Back" className="back-button__icon" />
                        <span className="back-button__text">Назад</span>
                    </button>
                </div>
            </div>
            <main className="main-content">
                <div className="content-container">
                    <div className="news-article-container">
                        <div className="news-article__title">{news.title}</div>
                        <div className="news-article__meta">{news.date}</div>
                        <div className="news-article__image-container">
                            <img src={news.image} alt={news.title} />
                        </div>
                        <div className="news-article__content">{news.content}</div>
                        <div className="news-article__source">{news.source}</div>
                        <div className="news-article__category-tag">{news.category}</div>
                    </div>
                    <Comments newsId={id} />
                </div>
            </main>
        </div>
    )
}