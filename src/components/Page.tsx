import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderLink,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiHeaderLogo,
  EuiHeaderBreadcrumbs,
  EuiPageTemplate,
  EuiPageSidebar,
  EuiPageHeader,
  EuiTitle,
  EuiText,
  EuiPage,
  EuiSearchBar,
  EuiHorizontalRule,
  EuiFacetGroup,
  EuiPageBody,
  EuiPageHeaderSection,
  EuiButton,
  EuiButtonEmpty,
  EuiPageSection,
  EuiFlexGroup,
  EuiPagination,
  EuiFlexGrid,
  useEuiTheme,
  getColorMode,
  EuiFormControlLayout,
} from '@elastic/eui';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/products-reducer';
import { AppStateType } from '../redux/store';
import { ProductType } from '../types/types';
import { ProductCard } from './ProductCard';
import { SiteSearch } from './SiteSearch';

export const Page: React.FC<{}> = React.memo((props) => {
  const { colorMode } = useEuiTheme();

  const productsList = useSelector((state: AppStateType) => state.products.products)
  const dispatch = useDispatch()
  //const [productsRequested, setProductsRequestedStatus] = useState(false)
  const [productsCount, setProductsCount] = useState<number | undefined>(0)
  const [searchResetIsLoading, setSearchResetStatus] = useState(false)
  let isProductsRequested = false;

  useEffect(() => {
    if (!isProductsRequested && !productsList) {
      dispatch(getProducts())
      isProductsRequested = true;
      //setProductsRequestedStatus(true)
    } 
  }, []);

  

  useEffect(()=>{
    setProductsCount(productsList?.length)
  }, [productsList])

  return (
    <>
      {/* UP HEADER */}
      <EuiHeader theme='dark'>


        {/* left */}
        <EuiHeaderSection grow={false} side='left'>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType={'logoAppSearch'}>SHOP</EuiHeaderLogo>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiHeaderLink isActive={true}>
              Products
            </EuiHeaderLink>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiHeaderLink>Purchases</EuiHeaderLink>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiHeaderLink iconType='help'>Units</EuiHeaderLink>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>


        {/* right */}
        <EuiHeaderSection grow={false} side='right'>

          <EuiHeaderSectionItem>
            <EuiHeaderSectionItemButton aria-label='Account Menu'>
              <EuiAvatar name='Your Name' size='s' />
            </EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>

        </EuiHeaderSection>
      </EuiHeader>

      {/* BOTTOM HEADER */}
      <EuiHeader theme={colorMode.toLowerCase() as 'dark' | 'default' | undefined}>
        <EuiHeaderBreadcrumbs breadcrumbs={[{
          text: 'Home', onClick: (e) => {
          }
        },
        { text: 'Products' }]}></EuiHeaderBreadcrumbs>
      </EuiHeader>


      {/* <EuiPageTemplate grow>
            <EuiPageTemplate.Sidebar sticky>
      
            </EuiPageTemplate.Sidebar>
      
       
            <EuiPageTemplate.Section grow={false}>
      
              <EuiText textAlign='left'>
                <EuiTitle ><h1>dfdf</h1></EuiTitle>
              </EuiText>
            </EuiPageTemplate.Section>
          </EuiPageTemplate>
          */}

      <EuiPage>
        <EuiPageSidebar paddingSize='l'>
          <EuiFormControlLayout>
            <EuiSearchBar box={{
              placeholder: 'Search...'
            }} />
            {/* <SiteSearch/> */}
          </EuiFormControlLayout>

          <EuiHorizontalRule margin='m' />
          <EuiFacetGroup />
        </EuiPageSidebar>

        <EuiPageBody component='div' paddingSize='l'>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size='s'>
                <p>{productsCount} Results</p>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiButtonEmpty
                onClick={() => setSearchResetStatus(!searchResetIsLoading)}
                isLoading={searchResetIsLoading}>
                Reset Search
              </EuiButtonEmpty>
            </EuiPageHeaderSection>
          </EuiPageHeader>

          {/* <EuiFlexGroup  justifyContent='spaceAround' gutterSize='l'>
              
              <ProductCard title='Product 1' price='100'/>
              <ProductCard title='Product 2' price='50'/>
              <EuiPagination />
            </EuiFlexGroup> */}


          <EuiFlexGrid columns={3} gutterSize='l'>

            {/* <ProductCard title='Product 1' price='100' />
            <ProductCard title='Product 2' price='50' /> */}
            {
              productsList?.map(p => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  price={p.price}
                  price_currency={p.price_currency}
                  image={p.image}
                  quantity={p.quantity}
                  description={p.description}
                  units={p.units}
                  created_at={p.created_at}
                  length={p.length}
                  width={p.width}
                  height={p.height}
                />
              ))
            }

          </EuiFlexGrid>
          <EuiPageSection alignment='center'>
            <EuiPagination />
          </EuiPageSection>

        </EuiPageBody>

      </EuiPage>
    </>

  )
})

