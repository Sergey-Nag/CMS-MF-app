import Button from './Button';
import React, {useMemo} from 'react';
import { BrowserRouter, createBrowserRouter, Link, Outlet, Route, RouterProvider, Routes, useParams } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>
                <h2>Admin Panel</h2>
                <Link to={'/dashboard'}>To dashboard</Link>
                <hr />
                <Outlet />
            </div>
        )
    },
    {
        path: '/dashboard',
        element: <></>,
        children: [
            {
                path: 'dashboard',
                element: <>Dashboard page <Link to={'/admin'}>Back</Link></>
            }
        ]
    }
], {
    // basename: '/admin'
})

const Main = () => (
    <>
        <div>
            <h2>Admin Panel</h2>
            <Link to={'/dashboard'}>To dashboard</Link>
        </div>
    </>
)

const DashboardPage = () => {
    const params = useParams();
    return <>Dashboard page {params.id ?? ''} <Link to={'/dashboard'}>Back</Link></>
}

const Dashboard = () => {
    const items = ['0', '1', '2', '3', '4'];
    console.log(items);
    return (
        <>
            <h2>Dashboard</h2>
            <ol>
                {items.map((id, i) => (<li><Link to={id} key={'unique'+id}>Go to a page №{id}</Link></li>) )}
            </ol>
            <hr />
            <Outlet />
            <hr />
            <Link to="/">Got to main</Link>
        </>
    )
}
const App = ({ basename = ''}) => (
    <div>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path=":id" element={<DashboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
