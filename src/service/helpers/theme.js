import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark", // "light" | "dark
    useSystemColorMode: true,
  }

  const theme = extendTheme({ config })
  

export default theme;
