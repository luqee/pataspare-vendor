import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { getShop } from "../../api/api";
import { UserContext } from "../../App";
import Footer from "../../components/Footer";
import ShopHeader from "../../components/vendor/ShopHeader";

function ShopManager(){
    const [shop, setShop] = useState({})
    const user = useContext(UserContext).user
    const params = useParams()
    const [headerHeight, setHeaderHeight] = useState(100)
    const handleResize = ()=> {
        let headerHeight = document.getElementById('Header').offsetHeight
        setHeaderHeight(headerHeight)
    }

    useEffect(()=> {
        window.addEventListener('resize', handleResize)
        handleResize()
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    })

    const fetchShop = ()=>{
      getShop(user.token, params.shopId, (response) => {
        setShop(response.data.shop)
      })
    }

    useEffect(()=> {
      fetchShop()
    }, [])
    return (
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
              marginTop: `${headerHeight}px`,
              paddingBottom: '10px,',
              paddingTop: '10px',
              flex: '1'
            }} >
              <Outlet context={{shop}} />
            </Container>
            <Container className='footer' fluid style={{
              paddingTop: '20px',
              backgroundColor: '#212529',
              color: '#ffffff',
            }}>
              <Footer />
            </Container>
        </Container>
    );
}

export default ShopManager;