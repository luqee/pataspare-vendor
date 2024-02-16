import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
import Footer from "@/components/Footer";
import ShopHeader from "@/components/vendor/ShopHeader";
import type { Metadata, Viewport } from 'next'
import { AuthProvider } from "@/context/AuthContext";

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}


export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Pataspare',
    template: '%s | PataSpare - Your one stop solution for your auto parts needs'
  },
  description: 'Find your nearest service provider. Source for your spareparts from a wide selection of auto part dealers. Quality parts, timely delivery and overall top service are our top priority.',

}

function ShopManager({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
      <html lang="en">
      <body>
        <AuthProvider>
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
                <ShopHeader />
              </Container>
              <Container style={{
                marginTop: `${100}px`,
                paddingBottom: '10px,',
                paddingTop: '10px',
                flex: '1'
              }} >
                {children}
              </Container>
          </Container>
        </AuthProvider>
      </body>
    </html>
    )
}

export default ShopManager;