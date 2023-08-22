import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CSSProperties, FunctionComponent, ReactElement, ReactNode, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContext } from '@/extensions/toast';
import { ToastMessageType } from './models/ToastMessageType';
import ToastCard from './Card/ToastCard';

export const metadata: Metadata = {
    title: 'Ticket wave web application',
    description: 'Ticket wave web application',
}

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => {

    const toastContext = useContext(ToastContext);

    return (
        <>
            <ToastCard
                visibility={toastContext?.toastOptions?.visible ?? false}
                title={toastContext?.toastOptions?.title ?? 'Welcome'}
                description={toastContext?.toastOptions?.description ?? ''}
                messageType={toastContext?.toastOptions?.type ?? ToastMessageType.Info}
                timeout={toastContext?.toastOptions?.timeout ?? 0.01} />
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;
