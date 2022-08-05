import './App.css';
import React from 'react';
import Search from "./page/Search";
import { BrowserRouter ,Router,Routes, Link,Route} from "react-router-dom";
import Summary from './page/Summary'
import LogIn from './page/logIn'
import SearchPage from './page/Search'
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/summary" element={<Summary />} />
                    <Route path="/" element={<LogIn />} />
                    <Route path="/search" element={< SearchPage/>} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
