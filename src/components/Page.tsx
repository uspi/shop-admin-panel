import React from 'react';
import { HeaderSection } from './Header/HeaderSection';
import { ProductsSection } from './Products/ProductsSection';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Purchases } from './Purchases/Purchases';
import { ProductEditSection } from './Products/ProductEditSection';
import { ProductType } from '../types/types';
import { ProductsStatistic } from './Products/ProductsStatistic';
import { EuiSpacer } from '@elastic/eui';
import { Units } from './Units/Units';

export const Page: React.FC<{}> = React.memo((props) => {
  //const { colorMode } = useEuiTheme();

  //const breadcrumbs = useSelector((state: AppStateType) => state.breadcrumbs.breadcrumbs)
  // const productsList = useSelector((state: AppStateType) => state.products.products)
  // const dispatch = useDispatch()
  // const [productsCount, setProductsCount] = useState<number | undefined>(0)
  // const [searchResetIsLoading, setSearchResetStatus] = useState(false)
  // let isProductsRequested = false;

  // useEffect(() => {
  //   if (!isProductsRequested && !productsList) {
  //     dispatch(getProducts())
  //     isProductsRequested = true;
  //     //setProductsRequestedStatus(true)
  //   }
  // }, []);


  // // set to page title count of results
  // useEffect(() => {
  //   setProductsCount(productsList?.length)
  // }, [productsList])

  return (
    <>
      <HeaderSection />
      <EuiSpacer size='xl'/>
      <EuiSpacer size='xl'/>
      <EuiSpacer size='xl'/>
      <Routes>
        <Route path='/products' element={
          <React.Suspense fallback={<>Loading...</>}>
            <ProductsSection />
          </React.Suspense>
          // <React.Suspense fallback={<>Loading...</>}>
          //   <ProductsSection />
          // </React.Suspense>
        } />
        <Route path='/products/:id' element={<ProductEditSection/>}/>
        {/* <Route path='/products/:productId'>
          <ProductEditSection product={{
            id: '',
            name: '',
            price: '',
            price_currency: '',
            image: null,
            quantity: 0,
            description: '',
            units: 'm',
            created_at: '',
            length: '',
            width: '',
            height: ''
          }} />
        </Route> */}
        <Route path='/purchases' element={
          <React.Suspense fallback={<>Loading...</>}>
            <Purchases />
          </React.Suspense>
        } />
        <Route path='/home' element={<Navigate replace to="/products" />} />
        <Route path='/' element={<Navigate replace to="/products" />} />
        <Route path='/statistic' element={
          <React.Suspense fallback={<>Loading...</>}>
            <ProductsStatistic />
          </React.Suspense>
        } />
        <Route path='/units' element={<Units/>} />
      </Routes>
    </>
  )
})

