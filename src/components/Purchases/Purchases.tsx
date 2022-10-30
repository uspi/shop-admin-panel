import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/breadcrumbs-reducer';
import { getPurchases } from '../../redux/purchases-reducer';
import { AppStateType } from '../../redux/store';
import { ProductCard } from '../Products/ProductCard';
import { PurchaseCard } from './PurchaseCard';

export const Purchases: React.FC<{}> = React.memo((props) => {
    const [purchasesCount, setPurchasesCount] = useState<number | undefined>(0)
    const [searchResetIsLoading, setSearchResetStatus] = useState(false)

    const dispatch = useDispatch()


    // useEffect(() => {
    //     dispatch(actions.setTopBreadCrumb({ text: 'Purchases' }, 0))
    // }, [])

    const purchasesList = useSelector((state: AppStateType) => state.purchases.purchases)
    let isProductsRequested = false;

    useEffect(() => {
        if (!isProductsRequested && !purchasesList) {
            dispatch(getPurchases())
            isProductsRequested = true;
            //setProductsRequestedStatus(true)
        }
    }, []);


    // set to page title count of results
    useEffect(() => {
        setPurchasesCount(purchasesList?.length)
    }, [purchasesList])

    return (
        <>
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
                                <p>{purchasesCount} Results</p>
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

                    <EuiSpacer />
                    <EuiFlexGroup justifyContent='spaceAround' gutterSize='l' direction='column'>
                        {
                            purchasesList?.map(p => (
                                <EuiFlexItem>
                                    <PurchaseCard {...p} />
                                </EuiFlexItem>
                            ))
                        }
                    </EuiFlexGroup>

                    <EuiPageSection alignment='center'>
                        <EuiPagination />
                    </EuiPageSection>

                </EuiPageBody>

            </EuiPage>
        </>
    )
})