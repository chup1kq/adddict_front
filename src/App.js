import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {routes} from "./route/routes";
import {Header} from "./components/Header";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
