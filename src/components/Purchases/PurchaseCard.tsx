import { EuiBadge, EuiBetaBadge, EuiButtonIcon, EuiCard, EuiFlexGroup, EuiFlexItem, EuiHealth, EuiPopover, EuiSpacer, EuiSplitPanel, EuiSuperSelect, EuiText } from '@elastic/eui'
import { MouseEventHandler, useState } from 'react';
import { PurchaseType } from '../../types/types'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux';
import { deletePurchase, updatePurchase } from '../../redux/purchases-reducer';

export const PurchaseCard: React.FC<{} & PurchaseType> = (props) => {

    const dispatch = useDispatch()

    const creationDate: Date = new Date(Date.parse(props.created_at));
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const totalPrice: number = Number.parseInt(props.product_price) * Number.parseInt(props.quantity)

    const statusSelectOptions = [
        {
            value: 'waiting',
            inputDisplay: (
                <EuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
                    Waiting
                </EuiHealth>
            ),
        },
        {
            value: 'delivery in progress',
            inputDisplay: (
                <EuiHealth color="primary" style={{ lineHeight: 'inherit' }}>
                    Delivery in progress
                </EuiHealth>
            ),
        },
        {
            value: 'delivered',
            inputDisplay: (
                <EuiHealth color="success" style={{ lineHeight: 'inherit' }}>
                    Delivered
                </EuiHealth>
            ),
        },
        {
            value: 'problem',
            inputDisplay: (
                <EuiHealth color="danger" style={{ lineHeight: 'inherit' }}>
                    Problem
                </EuiHealth>
            ),
        },
        {
            value: 'done',
            inputDisplay: (
                <EuiHealth color="#000000" style={{ lineHeight: 'inherit' }}>
                    Done
                </EuiHealth>
            ),
        },
    ];
    const [statusSelectValue, setStatusSelectValue] = useState(props.purchase_status);

    const onStatusChange = (value: string) => {
        setStatusSelectValue(value);
        dispatch(updatePurchase(props.id, { ...props, purchase_status: value }, true))
    };

    const onDeletePurchaseButtonClick = (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(deletePurchase(props.id))
    }
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
                            <EuiSuperSelect
                                style={{ minWidth: 200 }}
                                options={statusSelectOptions}
                                valueOfSelected={statusSelectValue}
                                onChange={(value) => onStatusChange(value)}
                            />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButtonIcon
                                color='danger'
                                display="empty"
                                iconType="trash"
                                iconSize="original"
                                size="m"
                                aria-label="Next"
                                onClick={onDeletePurchaseButtonClick}
                            />
                        </EuiFlexItem>

                    </EuiFlexGroup>
                </EuiSplitPanel.Inner>

            </EuiSplitPanel.Outer>
        </>

    )
}