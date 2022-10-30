import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem, EuiHeaderSection, EuiHeaderSectionItem, EuiIcon, EuiSpacer, EuiText } from '@elastic/eui'
import { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductType, UnitsType } from '../../types/types'

export const ProductCard: React.FC<PropsType> = (props) => {

    // const descriptionItemsSource: KeyValueType[] = [
    //     { "Avaible quantity": <>{props.quantity}</> },
    //     { "Description": <>{props.description}</> },
    //     { 'Width': <>{props.width} {props.units}</> },
    //     { 'Length': <>{props.length} {props.units}</> },
    //     { 'Height': <>{props.height} {props.units}</> },


    // ]

    const [isShowFlyout, setIsShowFlyout] = useState(false)

    return (
        <>
            <EuiFlexItem >
                <EuiCard
                    style={{minWidth: 240}}
                    textAlign='left'
                    image={
                        <div>
                            <img
                                src={props.image}
                                alt="Nature"
                            />
                        </div>
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
                    icon={<EuiIcon size="xxl" type="logoAppSearch" />}
                    footer={
                        <EuiFlexGroup justifyContent="flexEnd">
                            <EuiFlexItem grow={false}>
                                <Link to={ props.id}>Edit</Link>
                                {/* <EuiButton ><Link to={ props.id}>Edit</Link></EuiButton> */}
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