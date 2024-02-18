import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import VendorHeader from "@/components/vendor/VendorHeader";
import type { Metadata, Viewport } from 'next'
import { AuthProvider } from "@/context/AuthContext";
import { RequireAuth } from '@/components/PrivateComponent';
// import { Inter } from 'next/font/google'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}


export const metadata: Metadata = {
  metadataBase: new URL('http://vendor.pataspare.co.ke'),
  title: {
    default: 'Pataspare',
    template: '%s | PataSpare - Your one stop solution for your auto parts needs'
  },
  description: 'Find your nearest service provider. Source for your spareparts from a wide selection of auto part dealers. Quality parts, timely delivery and overall top service are our top priority.',

}

function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }){
    const headerHeight = 100
    // const [headerHeight, setHeaderHeight] = useState(100)
    // const handleResize = ()=> {
    //     let headerHeight = document.getElementById('Header').offsetHeight
    //     setHeaderHeight(headerHeight)
    // }

    // useEffect(()=> {
    //     window.addEventListener('resize', handleResize)
    //     handleResize()
    //     return ()=>{
    //         window.removeEventListener('resize', handleResize)
    //     }
    // })
    return (
      <html lang="en">
      <body>
        <AuthProvider>
          <RequireAuth>
          <Container fluid className="App" style={{
              padding: '0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
          }}>
              
              <Container id={`Header`} fluid  style={{
                  padding: '0',
                  position: 'fixed',
                  top: '0',
                  zIndex: '20',
              }}>
                <VendorHeader />
              </Container>
              <Container style={{
                marginTop: `${headerHeight}px`,
                paddingBottom: '10px,',
                paddingTop: '10px',
                flex: '1'
              }} >
                {children}
              </Container>
          </Container>
          </RequireAuth>
        </AuthProvider>
      </body>
    </html>
    );
}

export default DashboardLayout;