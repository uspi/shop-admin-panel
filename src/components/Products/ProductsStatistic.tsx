import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiStat, EuiIcon, EuiSpacer, EuiSwitch, EuiSwitchEvent, EuiFieldText, EuiForm, EuiFormRow, EuiPage, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiPageSidebar, EuiTitle, EuiPageHeaderContent } from '@elastic/eui';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products-reducer';
import { AppStateType } from '../../redux/store';

export const ProductsStatistic: React.FC<{}> = React.memo((props) => {
    const dispatch = useDispatch()

    const productsList =
        useSelector((state: AppStateType) => state.products.products)

    const [totalProductsAmount, setTotalProductsAmount] = useState<number>()
    const [totalProductsPrice, setTotalProductsPrice] = useState<number>()
    const [totalPiecesAmount, setTotalPiecesAmount] = useState<number>()


    useEffect(() => {
        // scroll to the top of the page
        window.scrollTo(0, 0)

        dispatch(getProducts())
    }, []);

    useEffect(() => {
        if (productsList === null) return

        const count = productsList?.length
        let totalPrice = 0
        let totalPieces = 0

        productsList.forEach(product => {
            totalPrice += parseInt(product.price) * product.quantity
            totalPieces += product.quantity
        });

        setTotalProductsAmount(count)
        setTotalProductsPrice(totalPrice)
        setTotalPiecesAmount(totalPieces)
    }, [productsList])

    return (

        <EuiPage>
            <EuiPageSidebar paddingSize='l'>

            </EuiPageSidebar>

            <EuiPageBody component='div' paddingSize='l'>
                <EuiPageHeader>
                    <EuiPageHeaderContent>
                        <EuiPageHeaderSection>
                            <EuiTitle><p>Statistic</p></EuiTitle>
                        </EuiPageHeaderSection>
                    </EuiPageHeaderContent>
                </EuiPageHeader>
                <EuiSpacer />
                <EuiFlexGroup >

                    <EuiFlexItem style={{ flexGrow: 0, flexBasis: 'auto' }}>
                        <EuiPanel>
                            <EuiStat
                                title={totalProductsAmount}
                                description="Varieties"
                                textAlign="left"
                            >
                                <EuiIcon type="empty" />
                            </EuiStat>
                        </EuiPanel>
                    </EuiFlexItem>

                    <EuiFlexItem style={{ flexGrow: 0, flexBasis: 'auto' }}>
                        <EuiPanel>
                            <EuiStat
                                title={totalPiecesAmount}
                                description="Pieces"
                                textAlign="left"
                            >
                                <EuiIcon type="empty" />
                            </EuiStat>
                        </EuiPanel>
                    </EuiFlexItem>

                    <EuiFlexItem style={{ flexGrow: 0, flexBasis: 'auto' }}>
                        <EuiPanel>
                            <EuiStat
                                title={"₴" + totalProductsPrice}
                                description="Total Price"
                                titleColor="success"
                                textAlign="left"
                            >
                            </EuiStat>
                        </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
            </EuiPageBody>
        </EuiPage>
    );
})