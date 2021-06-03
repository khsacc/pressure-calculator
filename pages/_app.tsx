import { useEffect } from 'react'
import '../styles/globals.css'
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { Theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return <ThemeProvider theme={Theme}><Component {...pageProps} /></ThemeProvider>
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};


export default MyApp
