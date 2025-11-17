import {Header} from "../components/Header.jsx";
import {Spinner} from "../components/Spinner.jsx";

export function LoadingPage() {
    return (
        <div className="app-container">
            <Header />
            <Spinner />
        </div>
    )
}