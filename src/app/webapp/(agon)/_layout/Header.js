/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "@/authContext";
import { useState, useEffect } from "react";
import SignOut from "@/components/auth/SignOut";
import { Avatar } from "@chakra-ui/react";
const Header = ({ headerStyle }) => {
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    })

    const { user } = useAuth();
    return (
        <div style={{ height: "77px" }}>
            <header className={`${headerStyle} header sticky-bar stick `}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <Link href="/" legacyBehavior>
                                    <h4 className="d-flex">
                                        Wisely
                                    </h4>
                                </Link>
                            </div>
                            <div className="header-nav">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className="main-menu">
                                        <li className="">
                                            <Link href="/webapp/" legacyBehavior><a className="active">Home</a></Link>
                                        </li>
                                        
                                        <li className="">
                                            <Link href="/webapp/find" legacyBehavior><a className="active">Find</a></Link>
                                        </li>

                                        <li className="">
                                            <Link href="/webapp/calendar" legacyBehavior><a className="active">Calendar</a></Link>
                                        </li>
                                        <li className="">
                                            <Link href="/webapp/about" legacyBehavior><a className="active">About</a></Link>
                                        </li>
                                        <li className="">
                                            <Link href="/webapp/contact" legacyBehavior><a className="active">Contact Us</a></Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="block-signin">

                                {
                                    user && (
                                        <Link href="/webapp/profile">
                                            {
                                                user.photoURL ? (
                                                    // <Avatar size='xs'
                                                    //     name={user.displayName || undefined}
                                                    //     src={user.photoURL}
                                                    //     style={{ cursor: "pointer", height: "30px", width: "30px", borderRadius: "50%" }}
                                                    //     />
                                                    <img
                                                        style={{ cursor: "pointer",
                                                            height: "36px",
                                                            borderRadius: "50%",
                                                            marginTop: "10px",
                                                            position: "relative",
                                                            top: "15px",
                                                        }}
                                                        src={user.photoURL}
                                                        alt="user.displayName"
                                                    />
                                                ) : (
                                                    user.displayName
                                                )

                                            }
                                        </Link>
                                    )
                                }

                                {user ?
                                    <SignOut isLarge /> :
                                    <Link href="/webapp/logon" legacyBehavior>
                                        <a className="btn btn-default hover-up">Log On</a>
                                        {/* <button type="button" class="btn2 btn-primary">Sign-up</button> */}
                                    </Link>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    );
};

export default Header;