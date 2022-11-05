import { EuiPage, EuiPageSidebar, EuiFormControlLayout, EuiSearchBar, EuiHorizontalRule, EuiFacetGroup, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiButtonEmpty, EuiFlexGrid, EuiPageSection, EuiPagination, EuiOverlayMask, EuiSpacer, EuiFlexGroup, EuiFlexItem, EuiFieldSearch, EuiFormRow, EuiSwitch, EuiPanel, EuiRange, useGeneratedHtmlId, EuiText, EuiListGroup, EuiListGroupItem, EuiFacetButton, EuiIcon, EuiAvatar, euiPaletteColorBlind } from '@elastic/eui';
import { stringify } from 'querystring';
import React, { ChangeEvent, Fragment, MouseEventHandler, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { productsSeedArray } from '../../assets/productsSeed';
import { getProducts, setProducts } from '../../redux/products-reducer';
import { AppStateType } from '../../redux/store';
import { ProductType } from '../../types/types';
import { LinkButton } from '../common/LinkButton';
import { SiteSearch } from '../SiteSearch';
import { ProductCard } from './ProductCard';
import { ProductEditSection } from './ProductEditSection';
import style from './ProductsSection.module.css'


// TODO: separate search to "ProductsSearch.tsx"
export const ProductsSection: React.FC<{}> = React.memo((props) => {
    const dispatch = useDispatch()

    const productsList = useSelector((state: AppStateType) => state.products.products)
    const [productsCount, setProductsCount] = useState<number | undefined>(0)
    let isProductsRequested = false;

    // RANGE
    const [priceRangevalue, setPriceRangevalue] = useState('120');
    const [priceRangeMinValue, setPriceRangeMinValue] = useState(0)
    const [priceRangeMaxValue, setPriceRangeMaxValue] = useState(0)
    const [isRangeResult, setIsRangeResult] = useState(false)


    const rangeWithValuePrependId = useGeneratedHtmlId({
        prefix: 'rangeWithValuePrepend',
    });

    const onRangeChange = (e: any) => {
        setPriceRangevalue(e.target.value);
        if (e.target.value === priceRangeMaxValue.toString()) {
            setIsRangeResult(false)
            return
        }
        setIsRangeResult(true)
    };

    // SEARCH
    const [searchResetIsLoading, setSearchResetStatus] = useState(false)
    const [isSearchResult, setIsSearchResult] = useState(false)
    const [productsSearchResult, setProductsSearchResult] = useState<ProductType[]>()
    const [isClearableSearch, setIsClearableSearch] = useState(true);
    const [searchValue, setSearchvalue] = useState('');


    


    useEffect(() => {
        // scroll to the top of the page
        window.scrollTo(0, 0)

        if (!isProductsRequested && !productsList) {
            dispatch(getProducts())
            isProductsRequested = true;
            //setProductsRequestedStatus(true)
        }
    }, []);


    useEffect(() => {
        if (isSearchResult) {

            setProductsCount(productsSearchResult?.length)
            return
        }

        // set to page title count of results
        setProductsCount(productsList?.length)

        const productPrices = productsList?.map(p => parseInt(p.price.split(' ').join('')))
        if (productPrices) {
            setPriceRangeMinValue(Math.min(...productPrices))
            setPriceRangeMaxValue(Math.max(...productPrices))
            setPriceRangevalue(Math.max(...productPrices).toString())
        }


    }, [productsList])

    useEffect(() => {
        if (isSearchResult) {
            const count = productsSearchResult?.length ?
                productsSearchResult?.length : 0
            setProductsCount(count)
            return
        }

        setProductsCount(productsList?.length)


    }, [isSearchResult])

    useEffect(() => {
        if (!isRangeResult && !isSearchResult) {
            setProductsCount(productsList?.length)
            return
        }
        let newProductsList: ProductType[] = []

        if (isRangeResult) {
            newProductsList =
                productsList?.filter(p => p.price <= priceRangevalue) ?
                    productsList?.filter(p => p.price <= priceRangevalue) :
                    []
        }

        if (newProductsList.length === 0) {
            newProductsList = productsList ? productsList : []

            console.log('new product list empty')
        }

        let newProductsResult: ProductType[] = newProductsList
        if (isSearchResult) {
            let searchByNameResult
                = newProductsResult?.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()))
            let searchByDescriptionResult
                = newProductsResult?.filter(p => p.description.toLowerCase().includes(searchValue.toLowerCase()))
            let searchByPriceResult
                = newProductsResult?.filter(p => p.price.toLowerCase().includes(searchValue.toLowerCase()))

            let searchByNameResultArray: ProductType[] = !searchByNameResult ? [] : searchByNameResult
            let searchByDescriptionResultArray: ProductType[] = !searchByDescriptionResult ? [] : searchByDescriptionResult
            let searchByPriceResultArray: ProductType[] = !searchByPriceResult ? [] : searchByPriceResult

            newProductsResult = [...new Set([
                ...searchByNameResultArray,
                ...searchByDescriptionResultArray,
                ...searchByPriceResultArray
            ])]
        }


        setProductsSearchResult(newProductsResult)
        setProductsCount(newProductsResult?.length)




    }, [searchValue, priceRangevalue])


    const onSeedButtonCilck: MouseEventHandler<HTMLAnchorElement> = (e) => {
        dispatch(setProducts(productsSeedArray, true))
    }




    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchvalue(e.target.value);
        setIsSearchResult(true)
        if (e.target.value === '') {
            setIsSearchResult(false)
        }
    };




    // Facets
    const [icon, setIcon] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [avatars, setAvatars] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedOptionId, setSelectedOptionId] = useState(undefined);

    const facet0Clicked = (id: any) => {
        setIcon(false);
        setDisabled(false);
        setAvatars(false);
        setLoading(false);
        setSelectedOptionId((selectedOptionId) =>
            selectedOptionId === id ? undefined : id
        );
    };

    const facet1Clicked = (id: any) => {
        setIcon(false);
        setDisabled(false);
        setAvatars(false);
        setLoading(false);
        setSelectedOptionId((selectedOptionId) =>
            selectedOptionId === id ? undefined : id
        );
    };

    const facet2Clicked = (id: any) => {
        setIcon(false);
        setDisabled(false);
        setAvatars(false);
        setLoading(false);
        //setDisabled((disabled) => !disabled);
        setSelectedOptionId((selectedOptionId) =>
            selectedOptionId === id ? undefined : id
        );
    };

    const list = [
        {
            id: 'facet0',
            label: 'Двухдверные',
            quantity: 6,
            iconColor: euiPaletteColorBlind()[0],
            onClick: facet0Clicked,
        },
        {
            id: 'facet1',
            label: 'Трехдверные',
            quantity: 60,
            iconColor: euiPaletteColorBlind()[1],
            onClick: facet1Clicked,
        },
        {
            id: 'facet2',
            label: 'Четырехдверные',
            quantity: 600,
            iconColor: euiPaletteColorBlind()[2],
            onClick: facet2Clicked,
        }
    ];

    //clearTimeout(searchTimeout);

    const searchTimeout = setTimeout(() => {
        // Simulate a remotely-executed search.
        setLoading(false);
    }, 1200);

    const facets = (align: any) => {
        return (
            <>
                {list.map((facet) => {
                    let iconNode;
                    if (icon) {
                        iconNode = <EuiIcon type="dot" color={facet.iconColor} />;
                    } else if (avatars) {
                        iconNode = <EuiAvatar size="s" name={facet.label} />;
                    }

                    return (
                        <EuiFacetButton
                            key={facet.id}
                            id={`${facet.id}_${align}`}
                            quantity={facet.quantity}
                            icon={iconNode}
                            isSelected={selectedOptionId === facet.id}
                            isDisabled={disabled && facet.id !== 'facet2'}
                            isLoading={loading}
                            style={{ padding: 0 }}
                            onClick={
                                facet.onClick ? () => facet.onClick(facet.id) : undefined
                            }
                        >
                            {facet.label}
                        </EuiFacetButton>
                    );
                })}
            </>
        );
    };

    return (
        <>
            <EuiPage>
                <EuiPageSidebar paddingSize='m' >
                    <EuiFormControlLayout className={style.outlinenon} >
                        <EuiFieldSearch
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => searchOnChange(e)}
                            isClearable={isClearableSearch}
                        />
                        {/* <SiteSearch /> */}
                    </EuiFormControlLayout>
                    <EuiSpacer size='m' />
                    <EuiPanel>
                        <EuiFormRow>
                            <EuiFacetGroup style={{ maxWidth: 200 }}>
                                {facets('Vertical')}
                            </EuiFacetGroup>
                        </EuiFormRow>
                        <EuiSpacer />
                        <EuiFormRow label='Price range'>
                            <>
                                <EuiRange
                                    id={rangeWithValuePrependId}
                                    min={priceRangeMinValue}
                                    max={priceRangeMaxValue}
                                    value={priceRangevalue}
                                    onChange={onRangeChange}
                                    showLabels
                                    showRange
                                    // showValue
                                    valuePrepend={""}
                                    aria-label="An example of EuiRange with valuePrepend prop"
                                />
                                <EuiFlexGroup style={{ justifyContent: 'space-around' }}>
                                    <EuiFlexItem grow={false}>
                                        <EuiText size='xs'>
                                            {priceRangevalue} ₴
                                        </EuiText>

                                    </EuiFlexItem>
                                </EuiFlexGroup>

                            </>

                        </EuiFormRow>


                    </EuiPanel>

                    <EuiSpacer size='s' />

                    <EuiHorizontalRule margin='m' />
                    <EuiFacetGroup />
                </EuiPageSidebar>

                <EuiPageBody component='div' paddingSize='l'>

                    <EuiPageHeader>
                        <EuiPageHeaderSection>
                            <EuiTitle size='s'>
                                <p>{productsCount} Results</p>
                            </EuiTitle>
                        </EuiPageHeaderSection>
                        <EuiPageHeaderSection>
                            <EuiFlexGroup>
                                <EuiFlexItem style={{ alignItems: 'center' }}>
                                    <LinkButton to={'new'} label='New' />
                                </EuiFlexItem>
                                <EuiFlexItem>

                                    <EuiButtonEmpty onClick={onSeedButtonCilck}>Seed</EuiButtonEmpty>
                                </EuiFlexItem>
                            </EuiFlexGroup>

                        </EuiPageHeaderSection>
                        {/* <EuiPageHeaderSection>
                            <EuiButtonEmpty
                                onClick={() => setSearchResetStatus(!searchResetIsLoading)}
                                isLoading={searchResetIsLoading}>
                                Reset Search
                            </EuiButtonEmpty>
                        </EuiPageHeaderSection> */}
                    </EuiPageHeader>

                    <EuiSpacer />
                    <EuiFlexGrid columns={4} gutterSize='l'>
                        {(!isSearchResult && !isRangeResult) &&
                            productsList?.map(p => (
                                <ProductCard
                                    {...p}
                                />
                            ))
                        }
                        {isRangeResult === true || isSearchResult === true ?
                            productsSearchResult?.map(p => (
                                <ProductCard
                                    {...p}
                                />
                            )) : undefined
                        }
                    </EuiFlexGrid>
                    <EuiPageSection alignment='center'>
                        <EuiPagination />
                    </EuiPageSection>
                </EuiPageBody>
            </EuiPage>
        </>
    )
})