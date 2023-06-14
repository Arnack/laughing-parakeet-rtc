import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "light", // "light" | "dark
    useSystemColorMode: true,
  }

  const theme = extendTheme({ config })
  

export default theme;
