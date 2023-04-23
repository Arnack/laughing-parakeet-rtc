import { ColorModeScript } from '@chakra-ui/react';
import theme from '@/service/helpers/theme';

const ColorModeScriptInjector = () => {
  return <ColorModeScript initialColorMode={theme.config.initialColorMode} />;
};

export default ColorModeScriptInjector;
