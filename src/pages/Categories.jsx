import {useEffect, useState} from 'react';
import { Header } from '../components/Header';
import { CategoryCard } from '../components/CategoryCard';
import axios from "axios";
import {ErrorPage} from "./ErrorPage.jsx";
import {LoadingPage} from "./LoadingPage.jsx";

export function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(1);
    const [IsError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get('https://089ea2db3fd3b3d0.mokky.dev/mastercategory');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error)
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    const handleCategoryClick = (id) => {
        setActiveCategory(id);
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
            <div className="category-header category-header--orange">
                Категории
            </div>
            <main className="main-content">
                <div className="content-container">
                    <div className="category-grid">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                title={category.title}
                                icon={category.icon}
                                isActive={activeCategory === category.id}
                                onClick={() => handleCategoryClick(category.id)}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}