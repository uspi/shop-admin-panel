import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination, EuiOverlayMask } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { getProducts } from '../../redux/products-reducer';
import { AppStateType } from '../../redux/store';
import { ProductCard } from './ProductCard';
import { ProductEditSection } from './ProductEditSection';
import style from './ProductsSection.module.css'


// TODO: separate search to "ProductsSearch.tsx"
export const ProductsSection: React.FC<{}> = React.memo((props) => {

    const productsList = useSelector((state: AppStateType) => state.products.products)
    const dispatch = useDispatch()
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


    // set to page title count of results
    useEffect(() => {
        setProductsCount(productsList?.length)
    }, [productsList])

    
    return (
        <>
            <EuiPage>
                <EuiPageSidebar paddingSize='l'>
                    <EuiFormControlLayout className={style.outlinenon}>
                        <EuiSearchBar className={style.outlinenon} box={{
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
                                    {...p}
                                />
                            ))
                        }

                    </EuiFlexGrid>
                    <EuiPageSection alignment='center'>
                        <EuiPagination />
                    </EuiPageSection>




                </EuiPageBody>

            </EuiPage>
            {/* <EditFlyout /> */}
        </>
    )
})