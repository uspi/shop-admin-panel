import { EuiPage, EuiPageSidebar, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiForm, EuiFormRow, EuiPanel, EuiFlexGroup, EuiFlexItem, EuiText, EuiToolTip, EuiButtonIcon, EuiSpacer, EuiButton, EuiFieldText, EuiFieldNumber, copyToClipboard, EuiComboBox, EuiComboBoxOptionOption, EuiSuperSelect, EuiSuperSelectOption, EuiHealth } from '@elastic/eui'
import React, { ChangeEvent, MouseEventHandler, ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PriceCurrencyList, PurchaseType } from '../../types/types'
import { LinkButton } from '../common/LinkButton'
import style from './PurchseNew.module.css'
import { v4 as uuid } from 'uuid'
import { addPurchase } from '../../redux/purchases-reducer'
import { AppStateType } from '../../redux/store'
import { Link } from 'react-router-dom'
import { getProducts } from '../../redux/products-reducer'

export const PurchaseEdit: React.FC<{}> = (props) => {
    let { id } = useParams()

    const dispatch = useDispatch()
    const isCreatingNew = id === 'new' ? true : false
    const [currentId, setCurrentId] = useState<string>()

    const [isTextCopied, setTextCopied] = useState(false);
    const [formHasChanges, setFormHasChanges] = useState(true)

    const [productId, setProductId] = useState()
    const [customerName, setCustomerName] = useState<string>()
    const [quantity, setQuantity] = useState<string>()
    const [createdAt, setCreatedAt] = useState()
    const [itemName, setItemName] = useState<string>()
    const [productPrice, setProductPrice] = useState<string>()
    const [priceCurrency, setPriceCurrency] = useState<string>()
    const [purchaseStatus, setPurchaseStatus] = useState<string>()

    const productsList = useSelector((state: AppStateType) => state.products.products)

    const currencySelectOptions: EuiSuperSelectOption<any>[] = PriceCurrencyList.map(v => ({
        value: v,
        inputDisplay: (
            <div>{v}</div>
        )
    }))
    const [productSelectOptions, setProductSelectOptions] = useState<{ label: string; value: string; }[] | undefined>()
    const [selectedOptions, setSelected] =
        useState<EuiComboBoxOptionOption[]>(
        );

    // COPY BUTTON
    const onCopyClick = () => {
        copyToClipboard(id as string);
        setTextCopied(true);
    };
    const onCopyBlur = () => {
        setTextCopied(false);
    };

    useEffect(() => {
        // scroll to the top of the page
        window.scrollTo(0, 0)

        setCurrentId(id === 'new' ? uuid() : id)
        dispatch(getProducts())
    }, []);

    // SAVE BUTTON
    const onSaveButtonClick: MouseEventHandler<HTMLAnchorElement> = (e) => {

        if (!currentId) {
            console.log('CurrentId is undefined')
            return
        }

        console.log('save')
        const savePurchase: PurchaseType | undefined = {
            id: currentId,
            product_id: productId ? productId : "undefined",
            customer_name: customerName ? customerName : "undefined",
            quantity: quantity ? quantity : "undefined",
            created_at: createdAt ? createdAt : "undefined",
            item_name: itemName ? itemName : "undefined",
            product_price: productPrice ? productPrice : "undefined",
            price_currency: priceCurrency ? priceCurrency : "undefined",
            purchase_status: purchaseStatus ? purchaseStatus : "undefined"
        }


        if (isCreatingNew) {
            dispatch(addPurchase(savePurchase, true))
        }
        //dispatch(updatePurchase(currentId, savePurchase, true))
    }

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

    const options = [
        {
            label: 'Titan',
            'data-test-subj': 'titanOption',
        },
        {
            label: 'Enceladus',
        },
        {
            label: 'Mimas',
        },
        {
            label: 'Dione',
        },
        {
            label: 'Iapetus',
        },
        {
            label: 'Phoebe',
        },
        {
            label: 'Rhea',
        },
        {
            label:
                "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        },
        {
            label: 'Tethys',
        },
        {
            label: 'Hyperion',
        },
    ];

    // const productSelectOptions = productsList?.map(p => ({
    //     label: p.name,
    //     value: p.id
    // }))



    useEffect(() => {
        setProductSelectOptions(productsList?.map(p => ({
            label: p.name,
            value: p.id
        })))

        //setSelected([{}])
        // setSelected([productSelectOptions ? 
        //     productSelectOptions[0] : { 'label': 'none', value: 'none' }])
        console.log("set effect")


        // const productName = 
        //     productsList?.filter(p => 
        //         p.id === selectedOptions[0].value as string)[0].name
        //         console.log(productName)
        // setItemName(productName)

    }, [productsList])

    // useEffect(() => {


    // }, [productSelectOptions])
    // const productSelectOptions = productsList?.map(p => ({
    //     label: p.name,

    // }))




    const onChange = (selectedOptions: EuiComboBoxOptionOption[]) => {
        // We should only get back either 0 or 1 options.
        //console.log(selectedOptions[0].value)
        setSelected(selectedOptions);

        const productName =
            productsList?.filter(p =>
                p.id === selectedOptions[0].value as string)[0].name
        setItemName(productName)
    };

    const onCustomerNameChange = (value: ChangeEvent<HTMLInputElement>) => {
        setCustomerName(value.target.value)
        setFormHasChanges(true)
    }

    const onQuantityChange = (value: ChangeEvent<HTMLInputElement>) => {
        setQuantity(value.target.value)
        setFormHasChanges(true)
    }
    const onPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
        setProductPrice(value.target.value)
        setFormHasChanges(true)
    }

    const onCurrencySelectChange = (value: string) => {
        setPriceCurrency(value)
        setFormHasChanges(true)
    }

    const onStatusChange = (value: string) => {
        setPurchaseStatus(value);
        setFormHasChanges(true)
    };

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
                <LinkButton to={"/purchases"} label='Back' />
            </EuiPageSidebar>

            <EuiPageBody component='div' paddingSize='l'>

                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        You edit a
                        <EuiTitle size='s'>
                            <p>New</p>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>




                <EuiForm>

                    <EuiFormRow >
                        <EuiPanel
                            paddingSize="none"
                            grow={false}
                            hasShadow={false}
                            hasBorder
                        >
                            <EuiFlexGroup
                                direction='row'
                                component="span"
                                justifyContent='flexStart'
                            >

                                <EuiFlexItem component="span" grow={false}
                                    style={{ marginRight: 0, paddingTop: 2, paddingLeft: 4 }}>
                                    <EuiText size="s">
                                        <>{currentId}</>
                                    </EuiText>
                                </EuiFlexItem>

                                <EuiFlexItem
                                    component="span"
                                    grow={false}
                                    style={{ marginLeft: 0 }}
                                >
                                    <EuiToolTip
                                        content={isTextCopied ? 'Text copied to clipboard' : 'Copy text'}

                                    >
                                        <EuiButtonIcon
                                            //buttonRef={buttonRef}
                                            aria-label="Copy text to clipboard"
                                            color="text"
                                            iconType="copy"
                                            onClick={onCopyClick}
                                            onBlur={onCopyBlur}
                                            size='xs'
                                        />
                                    </EuiToolTip>
                                </EuiFlexItem>

                            </EuiFlexGroup>



                        </EuiPanel>
                    </EuiFormRow>

                    <EuiSpacer />

                    <EuiFormRow>
                        <EuiFlexGroup>
                            <EuiFlexItem>
                                <EuiButton fill isDisabled={!formHasChanges} onClick={onSaveButtonClick}>
                                    Save
                                </EuiButton>
                            </EuiFlexItem>

                        </EuiFlexGroup>
                    </EuiFormRow>


                    <EuiSpacer size='l' />
                    <EuiFormRow label='Product' helpText={
                        selectedOptions && selectedOptions[0].value && <Link to={selectedOptions[0].value ? '/products/' + selectedOptions[0].value : ""}>Go to product</Link>
                    }
                    >

                        <EuiComboBox
                            aria-label="Accessible screen reader label"
                            placeholder="Select a single option"
                            singleSelection={{ asPlainText: true }}
                            options={productSelectOptions}
                            selectedOptions={selectedOptions}
                            onChange={onChange}
                            isClearable={false}

                        />
                    </EuiFormRow>
                    {/* <EuiFormRow label='Product' helpText='Click and type'>
                        <EuiFieldText
                            className={style.textField}
                            value={'ff'}
                        //aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow> */}
                    <EuiFormRow label='Customer Name' >
                        <EuiFieldText
                            className={style.textField}
                            value={customerName}
                            onChange={onCustomerNameChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Quantity' >
                        <EuiFieldNumber
                            className={style.textField}
                            value={quantity}
                            onChange={onQuantityChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Product Price' >
                        <EuiFieldNumber
                            className={style.textField}
                            value={productPrice}
                            onChange={onPriceChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Purchase Currency'>
                        <EuiSuperSelect
                            style={{ minWidth: 200 }}
                            options={currencySelectOptions}
                            valueOfSelected={priceCurrency}
                            onChange={(value) => onCurrencySelectChange(value)}
                        />

                    </EuiFormRow>
                    <EuiFormRow label='Purchase Status' >
                        <EuiSuperSelect
                            style={{ minWidth: 200 }}
                            options={statusSelectOptions}
                            valueOfSelected={purchaseStatus}
                            onChange={(value) => onStatusChange(value)}
                        />
                    </EuiFormRow>
                </EuiForm>



                {/* <EuiPageSection alignment='center'>
                        <EuiPagination />
                    </EuiPageSection> */}

            </EuiPageBody>

        </EuiPage>
    )
}