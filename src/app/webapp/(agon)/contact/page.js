


function Contact() {
    return (
        <>
            <section className="section-box">
                <div className="banner-hero banner-breadcrums">
                    <div className="container text-center">
                        <h1 className="text-heading-2 color-gray-1000 mb-20">Contact Us</h1>
                        {/* <p className="text-body-text color-gray-500">Equidem necessitatibus ei eam, ceteros expetenda<br className="d-lg-block d-none" />hendrerit ei per, tation vituperatoribus ut.</p> */}
                    </div>
                </div>
            </section>
            <section className="section-box">
                <div className="container mb-20 mt-140">
                    <div className="bdrd-58 box-gray-100 icon-wave">
                        <div className="row">
                            <div className="col-lg-12 mb-60"><span className="text-body-capitalized text-uppercase">Contact us</span>
                                <h2 className="text-heading-3 color-gray-900 mt-10">Have an question in mind?</h2>
                                <p className="text-body-text color-gray-600 mt-20">Do not hesitate to contact us</p>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group"><input className="form-control" placeholder="Enter your name" /></div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group"><input className="form-control" placeholder="Comapy (optioanl)" /></div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group"><input className="form-control" placeholder="Your email" /></div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group"><input className="form-control" placeholder="Phone number" /></div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group"><textarea className="form-control" placeholder="Tell us about yourself" /></div>
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

export default Contact;