import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiStat, EuiIcon, EuiSpacer, EuiSwitch, EuiSwitchEvent, EuiFieldText, EuiForm, EuiFormRow, EuiPage, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiPageSidebar, EuiTitle, EuiPageHeaderContent } from '@elastic/eui';
import React, { useState } from 'react'

export const ProductsStatistic: React.FC<{}> = React.memo((props) => {
    const [isLoading, setLoading] = useState(false);
    const totalProductsAmount: number = 2
    const totalProductsPrice: number = 15000
    const onToggleChange = (e: EuiSwitchEvent) => {
        setLoading(e.target.checked);
    };

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
                <EuiSpacer/>
                <EuiFlexGroup >
                    <EuiFlexItem style={{flexGrow: 0, flexBasis: 'auto'}}>
                        <EuiPanel>
                            <EuiStat
                                title={totalProductsAmount}
                                description="Products"
                                textAlign="left"
                                isLoading={isLoading}
                            >
                                <EuiIcon type="empty" />
                            </EuiStat>
                        </EuiPanel>
                    </EuiFlexItem>
                    
                    <EuiFlexItem style={{flexGrow: 0, flexBasis: 'auto'}}>
                        <EuiPanel>
                            <EuiStat
                                title={"₴" + totalProductsPrice}
                                description="Total Price"
                                titleColor="success"
                                textAlign="left"
                                isLoading={isLoading}

                            >
                                {/* <EuiIcon type="check" color="success" /> */}
                            </EuiStat>
                        </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
                {/* <EuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      /> */}

            </EuiPageBody>

        </EuiPage>
    );
})