import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark", // "light" | "dark
    useSystemColorMode: true,
  }




//   const theme = extendTheme({
//     colors: {
//         primary: {
//             500: '#357ABD',
//         },
//         secondary: {
//             500: '#23C0B3',
//         },
//         background: {
//             500: '#F7F9FC',
//         },
//         text: {
//             primary: '#333333',
//             secondary: '#777777',
//         },
//         error: {
//             500: '#E74C3C',
//         },
//         success: {
//             500: '#2ECC71',
//         }
//     },
//     components: {
//         Button: {
//             variants: {
//                 primary: {
//                     bg: 'primary.500',
//                     color: 'white',
//                     _hover: {
//                         bg: 'primary.600',
//                     },
//                 },
//                 secondary: {
//                     bg: 'secondary.500',
//                     color: 'white',
//                     _hover: {
//                         bg: 'secondary.600',
//                     },
//                 },
//             }
//         },
//         Text: {
//             baseStyle: {
//                 color: 'text.primary',
//             },
//             variants: {
//                 muted: {
//                     color: 'text.secondary',
//                 }
//             }
//         }
//         // ... you can further customize other components like FormLabel, Input, etc.
//     },
// });

  const theme = extendTheme({ config })
  

export default theme;
