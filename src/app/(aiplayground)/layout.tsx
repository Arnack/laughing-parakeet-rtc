'use client';

import { ColorModeScript, ChakraProvider, CSSReset } from "@chakra-ui/react";
import { FC } from "react";
import Navbar from "./_layout/Navbar";
import { Box } from "@chakra-ui/react";
import theme from "../../service/helpers/theme";
import ColorModeScriptInjector from "@/components/color-injector";
import { Analytics } from '@vercel/analytics/react';

interface IProps {
    children: React.ReactNode
}

const AiPlaygroundLayout: FC<IProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme} cssVarsRoot="body">
        {/* <CSSReset /> */}
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
        <ColorModeScriptInjector />
        <Box>
            <Navbar />
            <Box pt={12} px={4}>
                {children}
            </Box>
        </Box>
        </ChakraProvider>
        <Analytics />
      </body>
    </html>
  )
}

export default AiPlaygroundLayout;
