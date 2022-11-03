import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination, EuiFlyout, EuiFlyoutHeader, EuiForm, EuiFormRow, EuiFormLabel, EuiFormHelpText, EuiFieldText, EuiSpacer, EuiText, copyToClipboard, EuiToolTip, EuiButtonIcon, EuiPanel, EuiFlexGroup, EuiFlexItem, EuiCommentEvent, EuiCopy, EuiButton, EuiFieldNumber, EuiSuperSelect, EuiSuperSelectOption, EuiTextArea, useGeneratedHtmlId, EuiFilePicker, EuiDescribedFormGroup } from '@elastic/eui'
import { stringify } from 'querystring';
import { ChangeEvent, ChangeEventHandler, MouseEventHandler, Ref, RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, getProducts, updateProduct } from '../../redux/products-reducer';
import { AppStateType } from '../../redux/store';
import { formatBytes, PriceCurrencyList, ProductType, UnitsType, UnitsTypeList } from '../../types/types'
import { LinkButton } from '../common/LinkButton';
import { ProductCard } from './ProductCard'
import { v4 as uuid } from 'uuid'
import style from "./ProductEditSection.module.css"

export const ProductEditSection: React.FC<PropsType & {}> = (props) => {
    let { id } = useParams()
    
    const isCreatingNew = id === 'new' ? true : false
    const [currentProductId, setCurrentProductId] = useState<string>()
    
    let isProductsRequested = false;

    //const buttonRef = useRef<HTMLAnchorElement>();
    const [isTextCopied, setTextCopied] = useState(false);
    const dispatch = useDispatch()
    const currentProduct: ProductType | undefined = useSelector(
        (state: AppStateType) =>
            state.products.products?.filter(p => p.id === id)[0])

    const [formHasChanges, setFormHasChanges] = useState(false)

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
        setPriceCurrency(currentProduct?.price_currency.toUpperCase())
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
        // scroll to the top of the page
        window.scrollTo(0, 0)
        setCurrentProductId(id === 'new' ? uuid() : id)

        if (!isProductsRequested && !currentProduct) {
            dispatch(getProducts())
            isProductsRequested = true;
            //setProductsRequestedStatus(true)
        }

    }, []);

    // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setProductName(e.target.value);
    // };

    // COPY BUTTON
    const onCopyClick = () => {
        //buttonRef.current.focus(); // sets focus for safari
        copyToClipboard(currentProductId as string);
        setTextCopied(true);
    };
    const onCopyBlur = () => {
        setTextCopied(false);
    };

    // SAVE BUTTON
    const onSaveButtonClick: MouseEventHandler<HTMLAnchorElement> = (e) => {

        if (!currentProductId) {
            console.log('CurrentProductId is undefined')
            return
        }
        console.log('save')
        const saveProduct: ProductType | undefined = {
            id: currentProductId ? currentProductId : "undefined",
            name: productName ? productName : "undefined",
            price: price ? price : "undefined",
            price_currency: priceCurrency ? priceCurrency : "undefined",
            image: image ? image : "undefined",
            quantity: quantity ? quantity : -1,
            description: description ? description : "undefined",
            units: units ? units : undefined,
            created_at: createdAt ? createdAt : "undefined",
            length: length ? length : "undefined",
            width: width ? width : "undefined",
            height: height ? height : "undefined"
        }


        if (isCreatingNew){
            dispatch(addProduct(saveProduct, true))
        }
        dispatch(updateProduct(currentProductId, saveProduct, true))
    }

    const currencySelectOptions: EuiSuperSelectOption<any>[] = PriceCurrencyList.map(v => ({
        value: v,
        inputDisplay: (
            <div>{v}</div>
        )
    }))

    const unitsSelectOptions: EuiSuperSelectOption<any>[] = UnitsTypeList.map(v => ({
        value: v,
        inputDisplay: (
            <div>{v}</div>
        )
    }))

    const onCurrencySelectChange = (value: string) => {
        setPriceCurrency(value)
        setFormHasChanges(true)
    }

    const onNameChange = (value: ChangeEvent<HTMLInputElement>) => {
        setProductName(value.target.value)
        setFormHasChanges(true)
    }

    const onPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
        setPrice(value.target.value)
        setFormHasChanges(true)
    }

    const onQuantityChange = (value: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(value.target.value))
        setFormHasChanges(true)
    }

    const onDescriptionChange = (value: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(value.target.value)
        setFormHasChanges(true)
    }

    const onUnitsSelectChange = (value: string) => {
        setUnits(value.toLowerCase() as UnitsType)
        setFormHasChanges(true)
    }

    const onLengthChange = (value: ChangeEvent<HTMLInputElement>) => {
        setLength(value.target.value)
        setFormHasChanges(true)
    }
    const onHeightChange = (value: ChangeEvent<HTMLInputElement>) => {
        setHeight(value.target.value)
        setFormHasChanges(true)
    }
    const onWidthChange = (value: ChangeEvent<HTMLInputElement>) => {
        setWidth(value.target.value)
        setFormHasChanges(true)
    }

    // const onImageChange = (value: ChangeEvent<HTMLInputElement>) => {
    //     setImage(value.target.value)
    // }





    const [files, setFiles] = useState<File[]>();
    const [large, setLarge] = useState(true);

    const filePickerId = useGeneratedHtmlId({ prefix: 'filePicker' });

    const onImageChange = (fileList: FileList | null) => {

        if (fileList && fileList.length > 0) {
            setFiles(Array.from(fileList));


            const reader = new FileReader()
            reader.readAsDataURL(fileList[0])
            reader.onload = (e) => {
                if (reader.result) {
                    setImage(reader.result?.toString())
                }
            }   
        }
    };

    const renderFiles = () => {
        if (files && files.length > 0) {
            return (
                <div>
                    <strong>{files[0].name}</strong> <div>({formatBytes(files[0].size, 0)})</div>
                </div>
            );
        } else {
            return null
        }
    };
    // const renderFiles = () => {
    //     if (files && files.length > 0) {
    //         return (
    //             <ul>
    //                 {files.map((file, i) => (
    //                     <li key={i}>
    //                         <strong>{file.name}</strong> ({file.size} bytes)
    //                     </li>
    //                 ))}
    //             </ul>
    //         );
    //     } else {
    //         return (
    //             <p>Add some files to see a demo of retrieving from the FileList</p>
    //         );
    //     }
    // };



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

                <LinkButton to={"/products"} label='Back' />

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
                                        <>{currentProductId}</>
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

                    {/* <EuiDescribedFormGroup
                        title={<h3>Single text field</h3>}
                        description={
                            <p>
                                Descriptions are wrapped in a small, subdued{' '}
                              
                                . It can have links or any other type of content. Be sure to wrap
                                nodes in a paragraph tag.
                            </p>
                        }
                    >
                        <EuiFormRow label="Text field">
                            <EuiFieldText name="first" aria-label="Example" />
                        </EuiFormRow>
                    </EuiDescribedFormGroup> */}

                    <EuiFormRow label='Name' helpText='Click and type'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={productName}
                            onChange={onNameChange}
                        //aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Price' >
                        <EuiFieldNumber
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={price}
                            onChange={onPriceChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Price Currency'>
                        <EuiSuperSelect
                            style={{ minWidth: 200 }}
                            options={currencySelectOptions}
                            valueOfSelected={priceCurrency}
                            onChange={(value) => onCurrencySelectChange(value)}
                        />

                    </EuiFormRow>


                    <EuiFormRow label='Image'>
                        <EuiFlexGroup>
                            <EuiFlexItem grow={2}>

                                <EuiFilePicker
                                    id={filePickerId}
                                    // multiple
                                    initialPromptText="Select or drag and drop multiple files"
                                    onChange={onImageChange}
                                    display={large ? 'large' : 'default'}
                                    aria-label="Use aria labels when no actual label is in use"
                                />

                                <EuiSpacer />
                            </EuiFlexItem>
                            {files && (<EuiFlexItem>
                                <EuiText>
                                    <p>Files attached</p>
                                    {renderFiles()}
                                </EuiText>
                            </EuiFlexItem>)}

                        </EuiFlexGroup>
                    </EuiFormRow>


                    {/* <EuiFormRow label='Image' isDisabled>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={''}
                        />
                    </EuiFormRow> */}
                    <EuiFormRow label='Quantity'>
                        <EuiFieldNumber
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={quantity}
                            onChange={onQuantityChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Description'>
                        <EuiTextArea resize='none'
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={description}
                            onChange={onDescriptionChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Units'>
                        <EuiSuperSelect
                            style={{ minWidth: 200 }}
                            options={unitsSelectOptions}
                            valueOfSelected={units}
                            onChange={(value) => onUnitsSelectChange(value)}
                        />
                    </EuiFormRow>
                    <EuiFormRow label={'Length (' + units + ")"}>
                        <EuiFieldNumber
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={length}
                            onChange={onLengthChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label={'Width (' + units + ")"} >
                        <EuiFieldNumber
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={width}
                            onChange={onWidthChange}
                        />
                    </EuiFormRow>
                    <EuiFormRow label={'Height (' + units + ")"}>
                        <EuiFieldNumber
                            className={style.textField}
                            placeholder={currentProduct && currentProduct.name}
                            value={height}
                            onChange={onHeightChange}
                        />
                    </EuiFormRow>
                </EuiForm>
            </EuiPageBody>
        </EuiPage>
    )
}

type PropsType = {
    // product: ProductType
}