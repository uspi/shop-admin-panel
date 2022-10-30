import { EuiPage, EuiPageSidebar, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiForm, EuiFormRow, EuiPanel, EuiFlexGroup, EuiFlexItem, EuiText, EuiToolTip, EuiButtonIcon, EuiSpacer, EuiButton, EuiFieldText, EuiFieldNumber } from '@elastic/eui'

export const Units: React.FC<{}> = (props) => {
    return (
        <EuiPage>
            <EuiPageSidebar paddingSize='l'>
                {/* <EuiFormControlLayout>
                        <EuiSearchBar box={{
                            placeholder: 'Search...'
                        }} />
                       
                    </EuiFormControlLayout>

                    <EuiHorizontalRule margin='m' />
                    <EuiFacetGroup /> */}
            </EuiPageSidebar>

            <EuiPageBody component='div' paddingSize='l'>

                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle>
                            <p>Units</p>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageBody>
                    <EuiSpacer />
                    <EuiPanel>
                    <EuiText >
                        <dl>
                            <dd><b>mm</b> - milimeters</dd>
                            <dd><b>sm</b> - santimeters</dd>
                            <dd><b>m</b> - meters</dd>
                        </dl>
                    </EuiText>
                    </EuiPanel>
                   
                </EuiPageBody>

                {/* <EuiPageSection alignment='center'>
                        <EuiPagination />
                    </EuiPageSection> */}

            </EuiPageBody>

        </EuiPage>
    )
}