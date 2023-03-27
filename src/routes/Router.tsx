import { AccountInfo } from 'views/Account/AccountInfo';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { InitialRedirect } from 'routes';
import { NavBarLayout } from 'layouts';

const router = createBrowserRouter([
    {
        path: '/*',
        element: (
            <NavBarLayout>
                <InitialRedirect />
            </NavBarLayout>
        ),
    },
    {
        path: '/accounts/:account/*',
        element: (
            <NavBarLayout>
                <AccountInfo />
            </NavBarLayout>
        ),
    },
]);

export const Router = () => <RouterProvider router={router} />;
