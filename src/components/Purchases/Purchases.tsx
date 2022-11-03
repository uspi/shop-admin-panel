import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiButton } from '@elastic/eui';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchasesAPI } from '../../api/purchases-api';
import { purchasesSeedArray } from '../../assets/purchasesSeed';
import { actions } from '../../redux/breadcrumbs-reducer';
import { addPurchase, addPurchases, getPurchases, setPurchases } from '../../redux/purchases-reducer';
import { AppStateType } from '../../redux/store';
import { LinkButton } from '../common/LinkButton';
import { ProductCard } from '../Products/ProductCard';
import { PurchaseCard } from './PurchaseCard';
import { v4 as uuid } from 'uuid'

export const Purchases: React.FC<{}> = React.memo((props) => {
    const [purchasesCount, setPurchasesCount] = useState<number | undefined>(0)
    const [searchResetIsLoading, setSearchResetStatus] = useState(false)

    const dispatch = useDispatch()

    const purchasesList = useSelector((state: AppStateType) => state.purchases.purchases)

    let isProductsRequested = false;

    useEffect(() => {
        // scroll to the top of the page
        window.scrollTo(0, 0)
        
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


    const onSeedButtonCilck: MouseEventHandler<HTMLAnchorElement> = (e) => {
        dispatch(setPurchases(purchasesSeedArray, true))
    }

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
                    <EuiFlexGroup justifyContent='spaceAround' gutterSize='l' direction='column'>
                        {
                            purchasesList?.map(p => (
                                <EuiFlexItem>
                                    <PurchaseCard key={p.id} {...p} />
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