'use client'

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
// import Accordion from "../components/elements/Accordion";


function About2() {
    return (
        <>
                <section className="section-box">
                    <div className="banner-hero bg-about-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                {/* <div className="col-lg-6 box-banner-left"> */}
                                    <h1 className="text-display-3 mt-30">Resolve Your Issues Today</h1>
                                    <p className="text-body-lead-large color-gray-500 mt-40 mb-40 pr-40">
                                        Welcome to Wisely, the premier online consultation platform that brings professionals and seekers of knowledge and advice together from around the globe.
                                    </p>
                                    <div className="mt-40">
                                        <Link href="/webapp/find" legacyBehavior><a className="btn btn-black shape-square icon-arrow-right-white">Find Consultant</a></Link>

                                        <Link href="/webapp/join" legacyBehavior><a className="btn btn-link color-gray-900 icon-arrow-right text-heading-6">Became a consultant</a></Link>
                                    </div>
                                </div>
                                {/* <div className="col-lg-6 d-none d-lg-block">
                                    <div className="banner-imgs">
                                        <div className="block-1 shape-2"><img src="/assets/imgs/page/about/2/banner.png" alt="" /></div>
                                        <div className="float-end col-lg-6 mt-90">
                                            <div className="list-icons mt-50">
                                                <div className="item-icon none-bd"><span className="icon-left"><img src="/assets/imgs/page/about/2/icon-project-done.svg" alt="Agon" /></span>
                                                    <h4 className="text-heading-4"><span className="text-heading-3 color-green-900">+<span className="count">12</span>k</span></h4>
                                                    <p className="text-body-text color-gray-500">Projects done</p>
                                                </div>
                                                <div className="item-icon none-bd"><span className="icon-left"><img src="/assets/imgs/page/about/2/icon-officer.svg" alt="Agon" /></span>
                                                    <h4 className="text-heading-4"><span className="text-heading-3 color-green-900">+<span className="count">28</span>k</span></h4>
                                                    <p className="text-body-text color-gray-500">Offices / Factories</p>
                                                </div>
                                                <div className="item-icon none-bd"><span className="icon-left"><img src="/assets/imgs/page/about/2/icon-constant.svg" alt="Agon" /></span>
                                                    <h4 className="text-heading-4"><span className="text-heading-3 color-green-900">+<span className="count">15</span>k</span></h4>
                                                    <p className="text-body-text color-gray-500">Constant clients</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="mt-40"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1 col-sm-1 col-12" />
                            <div className="col-lg-10 col-sm-10 col-12 text-center">
                                {/* <div className="text-center mb-20"><span className="tag-1">How It Work ?</span></div> */}
                                <h3 className="text-display-3 color-gray-900 mb-60">How It Work?</h3>
                            </div>
                            <div className="col-lg-1 col-sm-1 col-12" />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1 col-sm-12 col-12" />
                            <div className="col-lg-10 col-sm-12 col-12">
                                <ul className="list-steps">
                                    <li className="icon-asset1 wow animate__animated animate__fadeIn" data-wow-delay=".1s">
                                        <div className="text-center block-step">
                                            <div className="mb-30"><img src="/assets/imgs/page/about/2/icon-start-plan.svg" alt="Agon" /></div>
                                            <h3 className="text-heading-5 mb-10">Sign Up</h3>
                                            <p className="text-body-text color-gray-500">Start by creating a free account</p>
                                        </div>
                                    </li>
                                    <li className="icon-asset2" >
                                        <div className="text-center block-step">
                                            <div className="mb-30"><img src="/assets/imgs/page/about/2/icon-connect.svg" alt="Agon" /></div>
                                            <h3 className="text-heading-5 mb-10">Browse Professionals</h3>
                                            <p className="text-body-text color-gray-500">Explore our vast network of professionals</p>
                                        </div>
                                    </li>
                                    <li className="icon-asset3">
                                        <div className="text-center block-step bg-5">
                                            <div className="mb-30"><img src="/assets/imgs/page/about/2/icon-match.svg" alt="" /></div>
                                            <h3 className="text-heading-5 mb-10">Book a Consultation</h3>
                                            <p className="text-body-text color-gray-500">Book a consultation at a time that suits you</p>
                                        </div>
                                    </li>
                                    <li className="icon-asset4 animate__animated animate__fadeIn">
                                        <div className="text-center block-step bg-9">
                                            <div className="mb-30"><img src="/assets/imgs/page/about/2/icon-review.svg" alt="" /></div>
                                            <h3 className="text-heading-5 mb-10">Provide Feedback</h3>
                                            <p className="text-body-text color-gray-500">After your session, you can leave a review</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="text-center block-step bg-5">
                                            <div className="mb-30"><img src="/assets/imgs/page/about/2/icon-complete.svg" alt="" /></div>
                                            <h3 className="text-heading-5 mb-10">Attend the Session</h3>
                                            <p className="text-body-text color-gray-500">On our secure, video conferencing platform</p>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="col-lg-1 col-sm-12 col-12" />
                        </div>
                    </div>
                </section>
                <section className="section-box mt-100 bg-green-900 pt-90 pb-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-sm-12 col-12 block-gallery-1">
                                <div className="row">
                                    <div className="col-lg-6"><img className="img-responsive mb-10" src="/assets/imgs/page/about/2/img-2.png" alt="" />
                                    <img className="img-responsive" src="/assets/imgs/page/about/2/img-3.png" alt="" /></div>
                                    <div className="col-lg-6"><img className="img-responsive" src="/assets/imgs/page/about/2/img-1.png" alt="" /></div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12 col-12 block-pl">
                                <h2 className="text-heading-1 color-white mb-30 mt-20">Our approach</h2>
                                <p className="text-inter-lg">
                                Our vision is to create a space where knowledge is easily accessible, barriers to entry are minimal, and where everyone can find the professional advice they need. With Wisely, we are moving a step closer to that reality every day.

We pride ourselves on our commitment to quality and transparency. Each of our professionals is thoroughly vetted to ensure they are qualified and experienced in their respective fields
                                </p>
                                <div className="mt-30">
                                    {/* <Link href="/page-service-2" legacyBehavior><a className="btn btn-black text-body-text">Keep Reading</a></Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* <section className="section-box mt-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-sm-1 col-12" />
                            <div className="col-lg-8 col-sm-10 col-12 text-center">
                                <h2 className="text-heading-1 color-gray-900">Frequently asked questions</h2>
                                <p className="text-body-lead-large color-gray-600 mt-20">Feeling inquisitive? Have a read through some of our FAQs or contact our supporters for help</p>
                            </div>
                            <div className="col-lg-2 col-sm-1 col-12" />
                        </div>
                    </div>
                    <div className="container mt-70">
                        <div className="row">
                            <div className="col-lg-1" />
                            <div className="col-lg-10">
                                <div className="row">
                                    <div className="col-lg-4 mb-50">
                                        <h4 className="text-heading-6 icon-leaf">People first</h4>
                                        <p className="text-body-excerpt color-gray-600 mt-15">The latest design trends meet hand-crafted templates.</p>
                                    </div>
                                    <div className="col-lg-4 mb-50">
                                        <h4 className="text-heading-6 icon-leaf">Agile approach</h4>
                                        <p className="text-body-excerpt color-gray-600 mt-15">The latest design trends meet hand-crafted templates.</p>
                                    </div>
                                    <div className="col-lg-4 mb-50">
                                        <h4 className="text-heading-6 icon-leaf">New mindset</h4>
                                        <p className="text-body-excerpt color-gray-600 mt-15">The latest design trends meet hand-crafted templates.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mt-50">
                                    
                                        <div className="mt-100 text-center">
                                            <Link href="/#" legacyBehavior><a className="btn btn-green-900 icon-arrow-right-white text-heading-6 color-white">Contact Us</a></Link>

                                            <Link href="/#" legacyBehavior><a className="btn btn-link text-heading-6">Support Center</a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-1" />
                        </div>
                    </div>
                </section> */}
                <section className="section-box box-gray-100 mb-20">
                    <div className="container">
                        <div className="icon-wave">
                            <div className="row">
                                <div className="col-lg-12 mb-60"><span className="text-body-capitalized text-uppercase">Contact us</span>
                                    <h2 className="text-heading-3 color-gray-900 mt-10">Have an question in mind?</h2>
                                    <p className="text-body-text color-gray-600 mt-20">Feel free to contact us</p>
                                </div>
                                {/* <div className="col-lg-2 mb-40"> */}
                                {/* <div className="col-lg-4 mb-40"> */}
                                    {/* <h4 className="text-heading-6 color-gray-900 icon-home mb-10 mt-10">Agon Studio</h4>
                                    <p className="text-body-text color-gray-600">4517 Washington Ave.<br />Manchester, Kentucky 39495</p>
                                    <p className="text-body-text color-gray-600">(239) 555-0108</p>
                                    <p className="text-body-text color-gray-600">contact@agon.com</p> */}
                                {/* </div> */}
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Enter your name" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Company (optional)" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Your email" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Phone number" /></div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group"><textarea className="form-control" placeholder="Describe you question" /></div>
                                        </div>
                                        <div className="col-lg-12 mt-15"><button className="btn btn-black icon-arrow-right-white mr-40 mb-20" type="submit">Send Message</button><br className="d-lg-none d-block" /><span className="text-body-text-md color-gray-500 mb-20">By clicking contact us button, you agree our terms and policy,</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        </>
    )
}

export default About2;