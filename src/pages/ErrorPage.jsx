import {Header} from "../components/Header.jsx";

export function ErrorPage() {
    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <div className="error-page">
                    <h1 className="error-page__title">Что-то пошло не так...</h1>
                    <p className="error-page__message">К сожалению, произошла ошибка. Возможно, страница не найдена или возникла проблема с сервером. Попробуйте ещё раз</p>
                </div>
            </main>
        </div>
    )
}