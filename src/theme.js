import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1430
    }
  },
  appBar: {
    background: 'rgba(255,255,255,1)',
    color: '#555'
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
