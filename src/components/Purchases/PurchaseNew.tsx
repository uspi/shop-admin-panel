import { EuiPage, EuiPageSidebar, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiForm, EuiFormRow, EuiPanel, EuiFlexGroup, EuiFlexItem, EuiText, EuiToolTip, EuiButtonIcon, EuiSpacer, EuiButton, EuiFieldText, EuiFieldNumber, copyToClipboard } from '@elastic/eui'
import { MouseEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PurchaseType } from '../../types/types'
import style from './PurchseNew.module.css'

export const PurchaseEdit: React.FC<{}> = (props) => {
    let { id } = useParams()

    const isCreatingNew = id === 'new' ? true : false

    const [isTextCopied, setTextCopied] = useState(false);
    const [formHasChanges, setFormHasChanges] = useState(true)
    const dispatch = useDispatch()

    const onCopyClick = () => {
        //buttonRef.current.focus(); // sets focus for safari
        copyToClipboard(id as string);
        setTextCopied(true);
    };

    const onCopyBlur = () => {
        setTextCopied(false);
    };

    const onSaveButtonClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        console.log('save')
    }
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
                    <EuiFormRow label='Name' helpText='Click and type'>
                        <EuiFieldText
                            className={style.textField}
                            placeholder={'pl'}
                            value={'ff'}
                        //aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                    <EuiFormRow label='Price' >
                        <EuiFieldNumber
                            className={style.textField}
                            placeholder={'pl'}
                            value={'ff'}
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