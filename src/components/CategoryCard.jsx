import { Link } from "react-router-dom";

export function CategoryCard({ title, icon, isActive = false, onClick }) {
    const normalized = (title || '').trim().toLowerCase();
    const linkTo = normalized === 'все новости' ? '/' : `/?category=${title}`;

    return (
        <Link to={`${linkTo}`} onClick={onClick} className={`category-card ${isActive ? 'category-card--active' : ''}`} >
            <div className="category-card__icon">
                <img src={`/icons/${icon}`} alt={title} />
            </div>
            <div className="category-card__title">{title}</div>
        </Link>
    )
}