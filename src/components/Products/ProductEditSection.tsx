import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination, EuiFlyout, EuiFlyoutHeader, EuiForm, EuiFormRow, EuiFormLabel, EuiFormHelpText, EuiFieldText, EuiSpacer, EuiText, copyToClipboard, EuiToolTip, EuiButtonIcon, EuiPanel, EuiFlexGroup, EuiFlexItem, EuiCommentEvent, EuiCopy, EuiButton, EuiFieldNumber } from '@elastic/eui'
import { ChangeEvent, ChangeEventHandler, Ref, RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../redux/products-reducer';
import { AppStateType } from '../../redux/store';
import { ProductType, UnitsType } from '../../types/types'
import { ProductCard } from './ProductCard'
import style from "./ProductEditSection.module.css"

export const ProductEditSection: React.FC<PropsType & {}> = (props) => {
    let { id } = useParams()
    let isProductsRequested = false;

    const unitsOptions: UnitsType[] = ['mm', 'cm', 'm']
    const unitsOptionsFormated = ['mm', 'cm', 'm']


    //const buttonRef = useRef<HTMLAnchorElement>();
    const [isTextCopied, setTextCopied] = useState(false);
    const dispatch = useDispatch()
    const currentProduct: ProductType | undefined = useSelector(
        (state: AppStateType) =>
            state.products.products?.filter(p => p.id === id)[0])

    const [productName, setProductName] = useState(currentProduct?.name);
    const [price, setPrice] = useState(currentProduct?.price)
    const [priceCurrency, setPriceCurrency] = useState(currentProduct?.price_currency)
    const [image, setImage] = useState(currentProduct?.image)
    const [quantity, setQuantity] = useState(currentProduct?.quantity)
    const [description, setDescription] = useState(currentProduct?.description)
    const [units, setUnits] = useState(currentProduct?.units)
    const [createdAt, setCreatedAt] = useState(currentProduct?.created_at)
    const [length, setLength] = useState(currentProduct?.length)
    const [width, setWidth] = useState(currentProduct?.width)
    const [height, setHeight] = useState(currentProduct?.height)

    useEffect(() => {
        setProductName(currentProduct?.name)
        setPrice(currentProduct?.price)
        setPriceCurrency(currentProduct?.price_currency)
        setImage(currentProduct?.image)
        setQuantity(currentProduct?.quantity)
        setDescription(currentProduct?.description)
        setUnits(currentProduct?.units)
        setCreatedAt(currentProduct?.created_at)
        setLength(currentProduct?.length)
        setWidth(currentProduct?.width)
        setHeight(currentProduct?.height)
    }, [currentProduct])



    useEffect(() => {
        if (!isProductsRequested && !currentProduct) {
            dispatch(getProducts())
            isProductsRequested = true;
            //setProductsRequestedStatus(true)
        }
    }, []);

    // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setProductName(e.target.value);
    // };

    const onCopyClick = () => {
        //buttonRef.current.focus(); // sets focus for safari
        copyToClipboard(id as string);
        setTextCopied(true);
    };

    const onCopyBlur = () => {
        setTextCopied(false);
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
            </EuiPageSidebar>

            <EuiPageBody component='div' paddingSize='l'>

                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        You edit a
                        <EuiTitle size='s'>
                            <p>{productName}</p>
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
                                        <>{id}</>
                                    </EuiText>
                                </EuiFlexItem>

                                <EuiFlexItem
                                    component="span"
                                    grow={false}
                                    style={{ marginLeft: 0 }}
                                >
                                    <EuiToolTip
                                        content={isTextCopied ? 'Text copied to clipboard' : 'Copy text'}
                                        className={style.textField}
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
                    <EuiSpacer size='l' />
                    <EuiFormRow label='Name' helpText='Click and type'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={productName}
                        //aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Price' >
                        <EuiFieldNumber
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={price}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Price Currency'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={priceCurrency}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Image' >
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={''}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Quantity'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={quantity}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Description'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={description}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Units'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={units}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Length'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={length}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Width'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={width}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Height'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={height}
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

type PropsType = {
    // product: ProductType
}