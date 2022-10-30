import { EuiBadge, EuiBetaBadge, EuiButtonIcon, EuiCard, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiSplitPanel, EuiText } from '@elastic/eui'
import { PurchaseType } from '../../types/types'

export const PurchaseCard: React.FC<{} & PurchaseType> = (props) => {

    const creationDate: Date = new Date(Date.parse(props.created_at));
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const totalPrice: number = Number.parseInt(props.product_price) * Number.parseInt(props.quantity)
    return (
        // <EuiCard 
        //     style={{ minWidth: 240 }}
        //     textAlign='left' 
        //     title={<EuiText><p>{props.item_name}</p></EuiText>}>
        // </EuiCard>
        <>

            <EuiSplitPanel.Outer direction='row' >
                <EuiSplitPanel.Inner >
                    <EuiText>
                        <b>{props.item_name}</b>&nbsp;
                        {props.customer_name}

                    </EuiText>
                    <EuiSpacer size='s' />
                    <EuiFlexGroup direction='column' wrap responsive={false} gutterSize="xs">
                        <EuiFlexItem grow={false}><EuiFlexGroup wrap responsive={false} gutterSize="xs">
                            <EuiBetaBadge
                                label={totalPrice.toString()}
                                color={"hollow"}
                            />
                            <EuiFlexItem grow={false}>
                                <EuiBadge color="white">{props.purchase_status}</EuiBadge>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                        </EuiFlexItem>
                        <EuiSpacer size='s' />
                        <EuiFlexItem grow={false}><EuiFlexGroup wrap responsive={false} gutterSize="xs">
                            <EuiFlexItem grow={false}>
                                <EuiBadge color="black">{props.quantity} pcs.</EuiBadge>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiBadge color="#DDD">
                                    {creationDate.getDate()} {monthNames[creationDate.getMonth()]} {creationDate.getFullYear()}
                                </EuiBadge>
                            </EuiFlexItem>
                        </EuiFlexGroup></EuiFlexItem>


                    </EuiFlexGroup>



                </EuiSplitPanel.Inner>

                <EuiSplitPanel.Inner color="subdued" grow={false}>
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiButtonIcon
                                display="base"
                                iconType="arrowRight"
                                iconSize="m"
                                size="s"
                                aria-label="Next"
                            />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButtonIcon
                                display="base"
                                iconType="arrowRight"
                                iconSize="m"
                                size="s"
                                aria-label="Next"
                            />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButtonIcon
                                display="base"
                                iconType="arrowRight"
                                iconSize="m"
                                size="s"
                                aria-label="Next"
                            />
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiSplitPanel.Inner>

            </EuiSplitPanel.Outer>
        </>

    )
}