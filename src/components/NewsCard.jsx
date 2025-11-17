import {Link} from "react-router-dom";

export function NewsCard(props) {
    return (
        <Link to={`/news/${props.id}`} className="news-item">
            <div className="news-item__title">{props.title}</div>
            <div className="news-item__meta">{props.date}</div>
            <div className="news-item__category">{props.category}</div>
        </Link>
    )
}