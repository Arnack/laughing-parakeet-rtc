'use client';

import Link from "next/link";
import { useState } from "react";

function Index4() {
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
