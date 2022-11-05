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
                            
                            The dimensions of cabinets and other similar interior items and furniture are most often determined by 3 parameters. This is height width and depth. Or otherwise height width and length. It is the latter option that is used in our catalog for ease of localization of sizes into other languages.
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