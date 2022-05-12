import axios from 'axios';
import urls from './config';
import { useMediaQuery } from 'react-responsive'

export const urls = {
  hostRoot: `${process.env.REACT_APP_BACKEND_URL}`,
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
}

export const autoAPI = axios.create({
  baseURL: urls.baseURL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
});

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export {
  Desktop,
  Tablet,
  Mobile,
  Default
}