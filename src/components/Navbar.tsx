import { FunctionComponent, ReactElement, useState, useRef } from 'react';
import styles from '../styles/Navbar.module.scss';
import Image from 'next/image';
import images from '../../public/images';
import { CaretDownIcon, CloseMenuIcon, HamburgerMenuIcon, MoonIcon, SunIcon, UserIcon } from './SVGs/SVGicons';
import useOuterClick from '@/hooks/useOuterClick';
import useResponsive from '@/hooks/useResponsiveness';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = (): ReactElement => {

    const { user, error, isLoading } = useUser();

    const router = useRouter();

    // const onMobile = useResponsive();    
    const windowRes = useResponsive();
    const onMobile = windowRes.width && windowRes.width < 768;

    const [navbarDropdownIsVisible, setNavbarDropdownIsVisible] = useState(false);
    // const [mobileNavbarIsVisible, setMobileNavbarIsVisible] = useState(false);
    const [isLightTheme, setIsLightTheme] = useState(false);

    const navbarDropdownRef = useRef<HTMLDivElement>(null);

    useOuterClick(navbarDropdownRef, setNavbarDropdownIsVisible);

    const [navbarIsVisible, setNavbarIsVisible] = useState(false);

    const navbarRef = useRef<HTMLDivElement>(null);

    // useRemoveHtmlElementFromDOM(navbarRef, navbarIsVisible, 600, "flex");
    // console.log(user);

    return (
        <>
            {
                typeof (onMobile) == "boolean" && onMobile &&
                <section className={styles.mobileNavbarContainer}>
                    <Link href='/'>
                        <div className={styles.logo}>
                            <Image src={images.logoWhite} alt='Logo' />
                        </div>
                    </Link>
                    <div className={styles.buttons}>
                        <span><SunIcon /></span>
                        <span onClick={() => setNavbarIsVisible(true)}><HamburgerMenuIcon /></span>
                    </div>
                    {navbarRef &&
                        <div className={navbarIsVisible ? styles.navbarOverlayContainer : styles.navbarOverlayContainerClose} ref={navbarRef}>
                            <span className={styles.overlay} onClick={() => setNavbarIsVisible(false)}></span>
                            <div className={styles.navbarOverlay}>
                                <span className={styles.closeIcon} onClick={() => setNavbarIsVisible(false)}><CloseMenuIcon /></span>
                                <div className={styles.navLinks}>
                                    <Link href='/' onClick={() => setNavbarIsVisible(false)}>
                                        <span className={router.pathname == '/' ? styles.active : ''}>Home</span>
                                    </Link>
                                    <Link href='/events' onClick={() => setNavbarIsVisible(false)}>
                                        <span className={router.pathname == '/events' ? styles.active : ''}>Events</span>
                                    </Link>
                                    <Link href='/about' onClick={() => setNavbarIsVisible(false)}>
                                        <span className={router.pathname == '/about' ? styles.active : ''}>About</span>
                                    </Link>
                                    {/* <Link href='/support' onClick={() => setNavbarIsVisible(false)}>
                                            <span className={router.pathname == '/support' ? styles.active : ''}>Support</span>
                                        </Link> */}
                                    {user ? <>
                                        <Link href='/account' onClick={() => setNavbarIsVisible(false)}>
                                            <span className={router.pathname == '/account' ? styles.active : ''}>Account</span>
                                        </Link>
                                        <Link href='/api/auth/logout' onClick={() => setNavbarIsVisible(false)}>
                                            <span>Log out</span>
                                        </Link>
                                    </> :
                                        <Link href='/api/auth/login' onClick={() => setNavbarIsVisible(false)}>
                                            <span className={router.pathname == '/account' ? styles.active : ''}>Login</span>
                                        </Link>}
                                </div>
                            </div>
                        </div>}
                </section>
            }
            {
                typeof (onMobile) == "boolean" && !onMobile &&
                <section className={styles.navbarContainer}>
                    <Link href='/'>
                        <div className={styles.navbarContainer__lhs}>
                            <div className={styles.logo}>
                                <Image src={images.logoWhite} alt='Logo' />
                            </div>
                            <p>Ticketwave</p>
                        </div>
                    </Link>
                    <div className={styles.navbarContainer__rhs}>
                        <ul className={styles.navLinks}>
                            <Link href='/'>
                                <li>Home</li>
                            </Link>
                            <Link href='/events'>
                                <li>Events</li>
                            </Link>
                            <Link href='/about'>
                                <li>About</li>
                            </Link>
                            {/* <li>Support</li> */}
                        </ul>
                        <div className={styles.accountSection} ref={navbarDropdownRef} onClick={() => setNavbarDropdownIsVisible(!navbarDropdownIsVisible)}>
                            {
                                user ? <>
                                    <div className={styles.profileCircle}>
                                        {<Image src={user?.picture as string} alt='Profile picture' fill /> ?? <UserIcon />}
                                    </div>
                                    <h3>{user?.name ?? 'Account'}</h3>
                                    <span className={styles.dropdownIcon}>
                                        <CaretDownIcon />
                                    </span>
                                    {
                                        navbarDropdownIsVisible &&
                                        <div className={styles.dropdownContainer}>
                                            <Link href='/app'>Dashboard</Link>
                                            <Link href='/app/profile'>Profile</Link>
                                            <Link href='/api/auth/logout'>Log out</Link>
                                        </div>
                                    }
                                </>
                                    : <Link href='/api/auth/login'>
                                        <button>
                                            Log in
                                        </button>
                                    </Link>
                            }
                        </div>
                        <span className={styles.themeController}>
                            {isLightTheme ? <MoonIcon /> : <SunIcon />}
                        </span>
                    </div>
                </section>
            }
        </>
    );
}

export default Navbar;