import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout.jsx'
import Home from '../pages/Home.jsx'
import Taro from '../pages/Taro.jsx'
import NotFound from '../pages/NotFound.jsx'
import Location from '../pages/Location.jsx'

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/taro" element={<Taro />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/location" element={<Location />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes


