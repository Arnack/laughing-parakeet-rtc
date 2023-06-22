'use client';

import "./_public/assets/css/style.css";
import "./_public/assets/css/modal.css";
import "./_public/assets/css/swiper-custom.css";
import Layout from "./_layout/Layout";
import { AuthProvider } from "@/authContext";
import { ChakraProvider } from "@chakra-ui/react";


const AgonLayout= ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="Wisely - online consultation platform" />
      </head>
      <body>

      {/* <ChakraProvider> */}
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      {/* </ChakraProvider> */}
      </body>
    </html>
  )
}

export default AgonLayout;
