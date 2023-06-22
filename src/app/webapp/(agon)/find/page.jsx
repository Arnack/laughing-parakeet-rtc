'use client'

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
function ShopFrid1() {
  return (
    <>
      <section className="section-box">
        <div className="banner-hero banner-breadcrums bg-gray-100">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="text-display-3 color-gray-900 mb-20">Find a Professional</h1>
                <p className="text-heading-6 color-gray-600 mb-20">Top consultants in the field<br className="d-lg-block d-none" />that is used by both small enterprises and space enterprises.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-box mt-90">
        <div className="container">
          <h2 className="text-heading-1 color-gray-900">Browse by category</h2>
          <div className="row">
            <div className="col-lg-6">
              <p className="text-body-lead-large color-gray-600 mt-20">Wellness, Language, Education, Business, Career, Legal, IT, and many more</p>
            </div>
            <div className="col-lg-6 text-end">
              <Link href="/webapp/find/all" legacyBehavior><a className="btn btn-default hover-up icon-arrow-right mt-10">Browse All</a></Link>
            </div>
          </div>
        </div>
        <div className="container mt-70">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Language</h4>
                {/* <p className="text-body-text color-gray-500">1253 pros</p> */}
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Legal</h4>
                {/* <p className="text-body-text color-gray-500">453</p> */}
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Wellness</h4>
                {/* <p className="text-body-text color-gray-500">7653 products</p> */}
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Business</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Career</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Finance</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/tablet.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">IT</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Lifestyle</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-grid-3 hover-up">
                <div className="category-img">
                  <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/shop1/book.svg" alt="" /></a></Link>
                </div>
                <h4 className="text-heading-5 mb-5">Home & family</h4>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      
      
      <section className="section-box mt-70 shop-bottom-banner">
        <div className="container">
          <div className="box-green box-green-2 bdr-18">
            <h3 className="text-heading-1 color-white">You can also download our mobile from App and Play store</h3>
            <p className="text-desc-white">Bring the world of online consultations to your phone</p>
            <div className="mt-60">
              <Link href="#" legacyBehavior><a className="mr-20"><img src="/assets/imgs/page/homepage5/apple-button.svg" alt="agon" /></a></Link>

              <Link href="#" legacyBehavior><a><img src="/assets/imgs/page/homepage5/google-play.svg" alt="agon" /></a></Link>
            </div>
            <div className="mt-10"><span className="cb-layout mr-5">Get consultations direct from the app</span><span className="cb-layout">Browse and search</span></div>
            {/* <div className="block-1 d-none d-lg-block"><img src="/assets/imgs/page/shop1/safety.png" alt="agon" /></div> */}
            {/* <div className="block-2 d-none d-lg-block"><img src="/assets/imgs/page/shop1/chart.png" alt="agon" /></div> */}
          </div>
        </div>
      </section>

    </>
  )
}

export default ShopFrid1;