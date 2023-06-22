'use client';

import Link from "next/link";
import { useState } from "react";

function Index4() {
    // Open modal
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const openModal = () => {
        setModal(!modal);
    };
    const spinner = () => {
        setVideoLoading(!videoLoading);
    };
    return (
        <>
            <section className="section-box">
                <div className="banner-hero banner-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <h1 className="text-display-2 color-white">Advanced way to resolve any issue</h1>
                                <p className="text-body-lead-large color-white mt-30 pr-40">Get an AI-empovered consultation with World-class experts. Anywhere, just on the tips of tour fingers</p>
                                <div className="mt-40">
                                    <Link href="/page-about-1" legacyBehavior><a className="btn btn-pink icon-arrow-right-white text-heading-6">Get Start
                                    </a></Link>
                                    <Link href="/page-contact" legacyBehavior><a className="btn btn-link color-white text-heading-6 btn-link-inter">Learn More
                                    </a></Link>
                                </div>
                                <div className="mt-60">
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-4 col-4">
                                            <h3 className="text-heading-2 color-white mb-15">500+</h3>
                                            <p className="text-body-normal color-gray-300">Happy Customers</p>
                                        </div>
                                        <div className="col-lg-3 col-sm-4 col-4">
                                            <h3 className="text-heading-2 color-white mb-15">20+</h3>
                                            <p className="text-body-normal color-gray-300">Top Experts</p>
                                        </div>
                                        <div className="col-lg-3 col-sm-4 col-4">
                                            <h3 className="text-heading-2 color-white mb-15">97%</h3>
                                            <p className="text-body-normal color-gray-300">Client Satisfaction</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 d-none d-lg-block">
                                <div className="banner-imgs">
                                    <a className="popup-youtube btn-play-video-2" onClick={openModal}></a>
                                    <img className="img-responsive shape-2" alt="" src="/assets/imgs/page/homepage4/banner.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-box mt-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-sm-12 mt-50">
                            <h2 className="text-heading-1 color-gray-900 mb-30">How It Works</h2>
                            <p className="text-body-excerpt color-gray-600"></p>
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 mt-50">
                            <div className="list-icons">
                                <div className="item-icon pl-0">
                                    <div className="mb-15">
                                        {/* <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="40" fill="#E4E7EC" />
                                            <g clip-path="url(#clip0_59_1397)">
                                                <path d="M54.1458 24.0834H41.8124C40.7903 24.0834 39.8099 24.4894 39.0871 25.2122C38.3643 25.935 37.9583 26.9153 37.9583 27.9375V28.4L36.0081 25.0176C35.7617 24.5625 35.4275 24.1607 35.0247 23.8358C34.6219 23.5108 34.1586 23.269 33.6617 23.1244C32.8351 22.8918 31.9545 22.9419 31.1597 23.2667C30.3648 23.5916 29.7012 24.1725 29.2741 24.9174L21.5781 38.2466C21.3081 38.6877 21.1282 39.1778 21.0488 39.6888C20.9694 40.1998 20.9921 40.7214 21.1156 41.2236C21.3274 42.054 21.81 42.7902 22.4871 43.3156C23.1642 43.8411 23.9971 44.1259 24.8541 44.125H29.0166C28.5511 45.7485 28.469 47.4578 28.7768 49.1184C29.0846 50.779 29.7739 52.3454 30.7903 53.6942C31.8067 55.0429 33.1224 56.1372 34.6339 56.8908C36.1453 57.6444 37.8111 58.0366 39.4999 58.0366C41.1888 58.0366 42.8546 57.6444 44.366 56.8908C45.8774 56.1372 47.1932 55.0429 48.2096 53.6942C49.226 52.3454 49.9153 50.779 50.223 49.1184C50.5308 47.4578 50.4488 45.7485 49.9833 44.125H54.1458C54.6519 44.125 55.1531 44.0253 55.6207 43.8316C56.0883 43.6379 56.5132 43.354 56.8711 42.9962C57.229 42.6383 57.5129 42.2134 57.7066 41.7458C57.9002 41.2782 57.9999 40.777 57.9999 40.2708V27.9375C57.9999 27.4314 57.9002 26.9302 57.7066 26.4626C57.5129 25.995 57.229 25.5701 56.8711 25.2122C56.5132 24.8543 56.0883 24.5704 55.6207 24.3767C55.1531 24.1831 54.6519 24.0834 54.1458 24.0834ZM26.1954 39.5L32.6118 28.3862L37.2522 36.4167C35.1294 36.8656 33.1896 37.9395 31.6822 39.5H26.1954ZM39.4999 53.375C38.2577 53.375 37.0434 53.0066 36.0105 52.3165C34.9777 51.6264 34.1727 50.6454 33.6973 49.4978C33.2219 48.3501 33.0975 47.0873 33.3399 45.8689C33.5822 44.6506 34.1804 43.5315 35.0588 42.6531C35.9372 41.7747 37.0563 41.1765 38.2746 40.9342C39.493 40.6919 40.7558 40.8162 41.9035 41.2916C43.0511 41.767 44.0321 42.572 44.7222 43.6049C45.4123 44.6377 45.7807 45.852 45.7807 47.0943C45.7787 48.7594 45.1163 50.3557 43.9389 51.5332C42.7614 52.7106 41.1651 53.373 39.4999 53.375ZM53.3749 39.5H47.3177C45.9964 38.1725 44.3713 37.1872 42.5833 36.6294V28.7084H53.3749V39.5Z" fill="#101828" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_59_1397">
                                                    <rect width="37" height="37" fill="white" transform="translate(21 21)" />
                                                </clipPath>
                                            </defs>
                                        </svg> */}

                                    </div>
                                    <h4 className="text-heading-4">1. Search</h4>
                                    <p className="text-body-text color-gray-600 mt-15">Find a top expert with our smart filters</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 mt-50">
                            <div className="list-icons">
                                <div className="item-icon pl-0">
                                    <div className="mb-15">

                                    </div>
                                    <h4 className="text-heading-4">2. Booking</h4>
                                    <p className="text-body-text color-gray-600 mt-15">Book a timesloth</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 mt-50">
                            <div className="list-icons">
                                <div className="item-icon pl-0">
                                    <div className="mb-15">
                                        </div>
                                    <h4 className="text-heading-4">3. Consultation</h4>
                                    <p className="text-body-text color-gray-600 mt-15">Resolve your issue with a top-class expert</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-box">
                <div className="container mt-90">
                    <div className="row">
                        <div className="col-lg-6 col-sm-12 block-img-we-do">
                            <div className="inner-image"><img className="bdrd-16 img-responsive" src="assets/imgs/page/homepage2/img-2.png" alt="" /></div>
                        </div>
                        <div className="col-lg-6 col-sm-12 block-we-do-2"><span className="tag-1 color-orange-900">What You Get</span>
                            <h3 className="text-heading-1 mt-30">AI empowered online consultations</h3>
                            <div className="list-icons mt-50">
                                <div className="item-icon none-bd hover-up"><span className="icon-left"><img src="/assets/imgs/page/homepage2/icon-work.svg" alt="" /></span>
                                    <h4 className="text-heading-4">Personalized Expert Guidance</h4>
                                    <p className="text-body-excerpt color-gray-600 mt-15"> AI-powered online consultations offer personalized guidance and solutions across various domains based on individual needs and preference</p>
                                </div>
                                <div className="item-icon none-bd hover-up"><span className="icon-left"><img src="/assets/imgs/page/homepage2/icon-design.svg" alt="" /></span>
                                    <h4 className="text-heading-4">Convenient and Flexible Access</h4>
                                    <p className="text-body-excerpt color-gray-600 mt-15">Seamless collaboration between experts and users through virtual platforms, fostering efficient communication</p>
                                </div>
                                <div className="item-icon none-bd hover-up"><span className="icon-left"><img src="/assets/imgs/page/homepage2/icon-advance.svg" alt="" /></span>
                                    <h4 className="text-heading-4">Enhanced Learning and Performance</h4>
                                    <p className="text-body-excerpt color-gray-600 mt-15">Intelligent tutoring systems that adapt to individual learning styles, providing personalized feedback and guidance for optimized learning outcomes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-box pt-100 pb-100 mt-100 mb-80 bg-6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 mb-30"><span className="tag-1 bg-9 color-gray-900">Built Exclusively For You</span>
                            <h3 className="text-heading-1 mt-30">Do not take our word for it. See what our customers say.</h3>
                            <p className="text-body-lead-large color-gray-600 mt-30">Real testimonials</p>
                            <div className="mt-40">
                                <Link href="/page-about-1" legacyBehavior><a className="btn btn-default btn-white icon-arrow-right">Learn More
                                </a></Link>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="card-grid-style-2 card-square hover-up mb-20">
                                        <p className="text-body-text color-gray-600 text-comment">{"The online consultations provided exceptional personalized guidance. The expert advice and tailored solutions helped me navigate complex issues efficiently"}</p>
                                        <div className="box-img-user">
                                            <div className="img-user img-user-round"><img src="/assets/imgs/page/homepage2/user-1.png" alt="" /></div>
                                            <h4 className="text-body-lead color-gray-900 mb-5">Jane Cooper</h4>
                                            <p className="text-body-text-md">Biffco Enterprises Ltd.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="card-grid-style-2 card-square hover-up mb-20">
                                        <p className="text-body-text color-gray-600 text-comment">{"Accessing psychology support online has been a game-changer. The convenience and quality of care exceeded my expectations, greatly improving my well-being"}</p>
                                        <div className="box-img-user">
                                            <div className="img-user img-user-round"><img src="/assets/imgs/page/homepage2/user-2.png" alt="Agon" /></div>
                                            <h4 className="text-body-lead color-gray-900 mb-5">Wade Warren</h4>
                                            <p className="text-body-text-md">Krusty Krab</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="card-grid-style-2 card-square hover-up mb-20">
                                        <p className="text-body-text color-gray-600 text-comment">{"The online tutoring sessions have significantly improved my child's performance. The tailored approach and guidance from subject experts boosted their confidence and academic success"}</p>
                                        <div className="box-img-user">
                                            <div className="img-user img-user-round"><img src="/assets/imgs/page/homepage2/user-3.png" alt="Agon" /></div>
                                            <h4 className="text-body-lead color-gray-900 mb-5">Leslie Alexander</h4>
                                            <p className="text-body-text-md">Biffco Enterprises Ltd.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="card-grid-style-2 card-square hover-up mb-20">
                                        <p className="text-body-text color-gray-600 text-comment">{"Language barriers were overcome during the consultation, and I received valuable advice for my business venture. It's an incredible tool for connecting with global experts"}</p>
                                        <div className="box-img-user">
                                            <div className="img-user img-user-round"><img src="/assets/imgs/page/homepage2/user-4.png" alt="Agon" /></div>
                                            <h4 className="text-body-lead color-gray-900 mb-5">Jenny Wilson</h4>
                                            <p className="text-body-text-md">Soylent Corp</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            
            
            
            {modal ? (
                <section className="modal__bg" onClick={openModal}>
                    <div className="modal__align">
                        <div className="modal__content" modal={modal}>
                            <div className="modal__video-align">
                                {videoLoading ? (
                                    <div className="modal__spinner">
                                        <i className="fi-rr-refresh"></i>
                                    </div>
                                ) : null}
                                <iframe
                                    className="modal__video-style"
                                    onLoad={spinner}
                                    loading="lazy"
                                    width="800"
                                    height="500"
                                    src="https://www.youtube.com/embed/oRI37cOPBQQ"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

        </>
    )
}

export default Index4;

