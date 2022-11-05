import {
    EuiButtonIcon, EuiCard, EuiFlexGroup, EuiFlexItem, EuiHeaderSection, EuiHeaderSectionItem, EuiImage, EuiSpacer, EuiText
} from '@elastic/eui'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../redux/products-reducer'
import { ProductType } from '../../types/types'
import { LinkButton } from '../common/LinkButton'

export const ProductCard: React.FC<ProductType> = (props) => {

    const dispatch = useDispatch()

    const onDeleteProductButtonClick = (
        value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                            style={{ maxHeight: 294 }}
                            alt={props.name}
                            src={props.image ? props.image : ""}
                        />
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
                    footer={
                        <EuiFlexGroup justifyContent="spaceBetween">
                            <EuiFlexItem grow={false}>
                                <LinkButton to={props.id} label='Edit' />
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