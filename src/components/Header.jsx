import {Link} from 'react-router-dom';
import menu_icon from '../../public/icons/menu.svg';
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const SearchQuery = searchParams.get('q');
    const [searchItem, setSearchItem] = useState(SearchQuery);

    const handleSearch = (e) => {
        e.preventDefault();

        const newSearchParams = new URLSearchParams(searchParams);
        if (searchItem.trim()) {
            newSearchParams.set('q', searchItem.trim());
        } else {
            newSearchParams.delete('q');
        }
        setSearchParams(newSearchParams, { replace: true });
    }

    return (
        <header className="app-header">
            <Link to='/categories' className="app-header__menu-button">
                <img src={menu_icon} alt="Menu" />
            </Link>
            <form className="app-header__form" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="app-header__input"
                    placeholder="Поиск..."
                    value={searchItem || ''}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
                <button type="submit" className="app-header__button">Поиск</button>
            </form>
        </header>
    )
}