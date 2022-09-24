import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiIcon, EuiText, EuiTitle } from '@elastic/eui'
import { UnitsType } from '../types/types'

export const ProductCard: React.FC<PropsType> = (props) => {
    return (
        <>
            <EuiFlexItem >
                <EuiCard

                    textAlign='left'
                    image={
                        <div>
                            <img
                                src="https://source.unsplash.com/400x200/?Nature"
                                alt="Nature"
                            />
                        </div>
                    }
                    title={
                        <>
                            <EuiHeaderSection side='left'>
                                <EuiHeaderSectionItem>
                                    <EuiTitle><>{props.name}</></EuiTitle>
                                </EuiHeaderSectionItem>
                            </EuiHeaderSection>
                            <EuiHeaderSection side='right'>
                                <EuiHeaderSectionItem>
                                    <EuiText size='m'>Price: {props.price} {props.price_currency.toUpperCase()}</EuiText>
                                </EuiHeaderSectionItem>
                            </EuiHeaderSection>
                        </>
                    }
                    description={
                        <EuiText>
                            <p>Avaible quantity: {props.quantity}</p>
                            <p>Description: {props.description}</p>
                            <p>Length: {props.length} {props.units}</p>
                            <p>Width: {props.width} {props.units}</p>
                            <p>Height: {props.height} {props.units}</p>
                        </EuiText>
                    }
                    icon={<EuiIcon size="xxl" type="logoAppSearch" />}
                    footer={
                        <EuiFlexGroup justifyContent="flexEnd">
                            <EuiFlexItem grow={false}>
                                <EuiButton>Edit</EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    }
                />
            </EuiFlexItem>

        </>

    )
}

export type PropsType = {
    name: string,
    price: string,
    price_currency: string,
    image: string | null,
    quantity: number,
    description: string,
    units: UnitsType,
    created_at: string,
    length: string,
    width: string,
    height: string
}

//  type InferActionsTypes<T> = T extends {
//     [key: string]: (...args: any[]) => infer U
//   }