'use client'

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
                <div className="bg-2-opacity-80">
                    <div className="box-login">
                        <div className="row">
                            <div className="col-xxl-7 col-xl-6 col-lg-6 col-md-12 login-left pl-0 d-none d-lg-flex"><img className="" src="/assets/imgs/page/login/img-1.png" alt="" /></div>
                            <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-12 login-right pr-0">
                                <div className="box-login-form">
                                    <div className="box-signup mt-90">
                                        <h1 className="text-heading-3 mb-40 text-center">Welcome back</h1>
                                        <span onClick={e => signInWithGoogle(e)}>
                                        <Link href="/webapp/logon" onClick={signInWithGoogle} legacyBehavior>
                                            <a className="btn btn-login-google color-gray-500 text-heading-6 box-shadow-2">
                                            <img className="img-responsive img-middle mr-10" src="/assets/imgs/template/icons/Icon-gg-login.svg" alt="" /> 
                                                Sign in with Google
                                            </a>
                                        </Link>
                                        </span> 

                                        <div className="text-center">
                                            <div className="mt-40 box-line-throught mb-40"><span className="text-body-text color-gray-500">Or, sign in with your email</span></div>
                                        </div>
                                        <div className="box-form-signup">
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Your email"
                                                type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <div className="form-field"><span className="text-body-small color-green-900 tag-top">Password</span>
                                                <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                {/* <span className="icon-eye-right" /> */}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <Link href="#" legacyBehavior><a className="text-body-text">Forgot password?</a></Link>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-green-full text-heading-6" onClick={handleSubmit}>
                                                    Sign In
                                                </button>
                                            </div>
                                            <div><span className="text-body-text color-gray-500">Don’t have an account?</span>
                                                <Link href="/webapp/signup" legacyBehavior><a className="text-body-text color-green-900">Sign Up</a></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login;