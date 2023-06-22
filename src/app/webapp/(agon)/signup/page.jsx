'use client'

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation'


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/webapp');
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            router.push('/webapp');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <section className="section-box">
                <div className="bg-6-opacity-30 pt-90">
                    <div className="container">
                        <div className="box-signup">
                            <h1 className="text-heading-3 mb-50 text-center">Let’s join us</h1>
                            <span onClick={e => signInWithGoogle(e)}>
                                <Link href="/webapp/signup" onClick={signInWithGoogle} legacyBehavior>
                                    <a className="btn btn-login-google color-gray-500 text-heading-6 box-shadow-2">
                                        <img className="img-responsive img-middle mr-10" src="/assets/imgs/template/icons/Icon-gg-login.svg" alt="" />
                                        Sign in with Google
                                    </a>
                                </Link>
                            </span>

                            <div className="text-center">
                                <div className="mt-40 box-line-throught mb-40"><span className="text-body-text color-gray-500">Or, sign up with your email</span></div>
                            </div>
                            <div className="box-form-signup mb-200">
                                <div className="form-group">
                                    <input className="form-control" placeholder="Your email"
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <div className="form-field"><span className="text-body-small color-green-900 tag-top">Password</span>
                                        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-field"><span className="text-body-small color-green-900 tag-top">Re-type Password</span>
                                    <input className="form-control" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                    {/* <span className="icon-eye-right" /> */}
                                    </div>
                                </div>
                                <div className="form-group"><label className="text-body-small color-gray-500"><input className="chkbox" type="checkbox" /> Agree to
                                    <Link href="/webapp " legacyBehavior><a> terms and conditions</a></Link>
                                </label></div>
                                <div className="form-group"><button className="btn btn-green-full text-heading-6">Continue</button></div>
                                <div><span className="text-body-text color-gray-500">Already have an account? </span>
                                    <Link href="/webapp/logon" legacyBehavior><a className="text-body-text color-green-900"> Sign in now</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="images-lists">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-6 pl-0"><img className="img-responsive img-full img-1" src="/assets/imgs/page/signup/img-1.png" alt="" /></div>
                            <div className="col-lg-2 col-md-2 col-sm-6"><img className="img-responsive img-full img-2" src="/assets/imgs/page/signup/img-2.png" alt="" /></div>
                            <div className="col-lg-4 col-md-4 col-sm-12"><img className="img-responsive img-full img-3" src="/assets/imgs/page/signup/img-3.png" alt="" /></div>
                            <div className="col-lg-2 col-md-2 col-sm-6"><img className="img-responsive img-full img-4" src="/assets/imgs/page/signup/img-4.png" alt="" /></div>
                            <div className="col-lg-2 col-md-2 col-sm-6 pr-0"><img className="img-responsive img-full img-5" src="/assets/imgs/page/signup/img-5.png" alt="" /></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;