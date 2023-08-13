import dynamic from 'next/dynamic';
import { Suspense } from 'react';

//@ts-ignore
const AdminComponent = dynamic(() => import('remote/AdminComponent'), {
    ssr: false,
});


export const AdminApp = () => {
    return (
        <Suspense>
            <AdminComponent />
        </Suspense>
    )
}