import { NavBar } from 'components/NavBar';

export interface NavBarLayoutProps {
    children: JSX.Element;
}

export const NavBarLayout = ({ children }: NavBarLayoutProps) => {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl h-full border-box py-20">{children}</div>
            </div>
        </>
    );
};
