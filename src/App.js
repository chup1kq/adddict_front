import {BrowserRouter as Router} from "react-router-dom";

import {AppRoutes} from "./route/routes";
import {Header} from "./components/Header";

function App() {
    return (
        <Router>
            <Header />
            <AppRoutes />
        </Router>
    );
}

export default App;
