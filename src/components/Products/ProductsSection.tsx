import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination, EuiOverlayMask, EuiSpacer, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { productsSeedArray } from '../../assets/productsSeed';
import { getProducts, setProducts } from '../../redux/products-reducer';
import { AppStateType } from '../../redux/store';
import { LinkButton } from '../common/LinkButton';
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
        // scroll to the top of the page
        window.scrollTo(0, 0)

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

    const onSeedButtonCilck: MouseEventHandler<HTMLAnchorElement> = (e) => {
        dispatch(setProducts(productsSeedArray, true))
    }

    
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
                            <EuiFlexGroup>
                                <EuiFlexItem style={{alignItems: 'center'}}>
                                    <LinkButton to={'new'} label='New'/>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                   
                                    <EuiButtonEmpty onClick={onSeedButtonCilck}>Seed</EuiButtonEmpty>
                                </EuiFlexItem>
                            </EuiFlexGroup>

                        </EuiPageHeaderSection>
                        <EuiPageHeaderSection>
                            <EuiButtonEmpty
                                onClick={() => setSearchResetStatus(!searchResetIsLoading)}
                                isLoading={searchResetIsLoading}>
                                Reset Search
                            </EuiButtonEmpty>
                        </EuiPageHeaderSection>
                    </EuiPageHeader>

                    <EuiSpacer />
                    <EuiFlexGrid columns={4} gutterSize='l'>
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
        </>
    )
})