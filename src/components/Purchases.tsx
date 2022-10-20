import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/breadcrumbs-reducer';
import { ProductCard } from './Products/ProductCard';

export const Purchases: React.FC<{}> = React.memo((props) => {
    const [purchasesCount, setPurchasesCount] = useState<number | undefined>(0)
    const [searchResetIsLoading, setSearchResetStatus] = useState(false)

    const dispatch = useDispatch()
    
    
    // useEffect(() => {
    //     dispatch(actions.setTopBreadCrumb({ text: 'Purchases' }, 0))
    // }, [])

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

                    {/* <EuiFlexGroup  justifyContent='spaceAround' gutterSize='l'>
              
              <ProductCard title='Product 1' price='100'/>
              <ProductCard title='Product 2' price='50'/>
              <EuiPagination />
            </EuiFlexGroup> */}


                    <EuiFlexGrid columns={3} gutterSize='l'>

                        {/* <ProductCard title='Product 1' price='100' />
            <ProductCard title='Product 2' price='50' /> */}
                        {/* {
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
                        } */}

                    </EuiFlexGrid>
                    <EuiPageSection alignment='center'>
                        <EuiPagination />
                    </EuiPageSection>

                </EuiPageBody>

            </EuiPage>
        </>
    )
})