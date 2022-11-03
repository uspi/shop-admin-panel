import { EuiButton, EuiButtonIcon, EuiCard, EuiFlexGroup, EuiFlexItem, EuiHeaderSection, EuiHeaderSectionItem, EuiIcon, EuiImage, EuiSpacer, EuiText } from '@elastic/eui'
import { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProduct } from '../../redux/products-reducer'
import { ProductType, UnitsType } from '../../types/types'
import { LinkButton } from '../common/LinkButton'

export const ProductCard: React.FC<PropsType> = (props) => {

    // const descriptionItemsSource: KeyValueType[] = [
    //     { "Avaible quantity": <>{props.quantity}</> },
    //     { "Description": <>{props.description}</> },
    //     { 'Width': <>{props.width} {props.units}</> },
    //     { 'Length': <>{props.length} {props.units}</> },
    //     { 'Height': <>{props.height} {props.units}</> },


    // ]

    const dispatch = useDispatch()

    const [isShowFlyout, setIsShowFlyout] = useState(false)

    const onDeleteProductButtonClick = (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(deleteProduct(props.id))
        console.log(props.id + ' Delete')
    }

    return (
        <>
            <EuiFlexItem >
                <EuiCard
                    style={{ minWidth: 240 }}
                    textAlign='left'
                    image={
                        <EuiImage
                            size="l"
                            style={{maxHeight: 294}}
                            //hasShadow
                            // caption={
                            //     <p>
                            //         <em>Mastigias papua</em>, also known as spotted jelly
                            //     </p>
                            // }
                            alt={props.name}
                            src={props.image ? props.image : ""}
                        />
                    //     <div  style={{maxHeight: 294}}>
                    //     <img
                    //         src={props.image}
                    //         alt="Nature"
                           
                    //     />
                    // </div>

                    }
                    title={
                        <>
                            <EuiHeaderSection side='left'>
                                <EuiHeaderSectionItem>
                                    <EuiText ><>{props.name}</></EuiText >
                                </EuiHeaderSectionItem>
                            </EuiHeaderSection>
                            <EuiSpacer size='xs' />
                            <EuiHeaderSection side='right'>
                                <EuiHeaderSectionItem>
                                    <EuiText >

                                        <h4>{props.price} {props.price_currency.toUpperCase()}</h4>
                                    </EuiText>
                                </EuiHeaderSectionItem>
                            </EuiHeaderSection>
                        </>
                    }
                    description={
                        <EuiText size='s'>
                            <div><strong>Avaible quantity</strong>: {props.quantity}</div>
                            <div><strong>Length</strong>: {props.length} {props.units}</div>
                            <div><strong>Width</strong>: {props.width} {props.units}</div>
                            <div><strong>Height</strong>: {props.height} {props.units}</div>
                            <EuiSpacer size='xs' />
                            <div>{props.description}</div>


                        </EuiText>


                    }
                    // icon={<EuiIcon size="xxl" type="logoAppSearch" />}
                    footer={
                        <EuiFlexGroup justifyContent="spaceBetween">
                            <EuiFlexItem grow={false}>
                                <LinkButton to={props.id} label='Edit' />
                                {/* <EuiButton ><Link to={ props.id}>Edit</Link></EuiButton> */}
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiButtonIcon
                                    color='danger'
                                    display="empty"
                                    iconType="trash"
                                    iconSize="original"
                                    size="m"
                                    aria-label="Next"
                                    onClick={onDeleteProductButtonClick}
                                />
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    }
                />
            </EuiFlexItem>

        </>

    )
}

export type PropsType = {

} & ProductType

export type KeyValueType = {
    [key: string]: ReactElement
}

//  type InferActionsTypes<T> = T extends {
//     [key: string]: (...args: any[]) => infer U
//   }