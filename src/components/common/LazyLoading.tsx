import React from 'react';
import Loading from './Loading';

export default function LazyLoading(props: {children: React.ReactNode}) {
    return (
        <React.Suspense fallback={<Loading />}>
            { props.children }
        </React.Suspense>
    );
}
