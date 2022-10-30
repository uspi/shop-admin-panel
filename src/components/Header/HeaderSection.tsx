import { EuiAvatar, EuiHeader, EuiHeaderBreadcrumbs, EuiHeaderLink, EuiHeaderLogo, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiTextColor, useEuiTheme } from '@elastic/eui';
import { EuiBreadcrumbProps } from '@elastic/eui/src/components/breadcrumbs/breadcrumb';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ColorModeType } from '../../types/types';
import { NavLinkButton } from './NavLinkButton';

export const HeaderSection: React.FC<PropsType> = React.memo((props) => {
    const { colorMode } = useEuiTheme();

    let location = useLocation()
    let breadcrumbArray: string[] = location.pathname.split("/").filter(e => e)

    let breadcrumbArrayProp: EuiBreadcrumbProps[] = breadcrumbArray.map(s => {
        // if that breadcrub not last, and actualy opened right now
        // and so must have an active link
        if (breadcrumbArray[breadcrumbArray.length - 1] !== s) {
            return {
                href: '/' + s,
                text: <NavLink to={"/" + s}>{s}</NavLink>,
            }
        }

        return {
            text: s,
        }
    })
    // let breadcrumbArrayProp: EuiBreadcrumbProps[] = breadcrumbArray.map(s =>({
    //     href: s,
    //     text: <NavLink to={"/" + s}>{s}</NavLink>,
    // }))

    //const breadcrumbs = useSelector((state: AppStateType) => state.breadcrumbs.breadcrumbs)
    return (
        <>
            {/* UP HEADER */}
            < EuiHeader theme='dark' position='fixed'>


                {/* left */}
                < EuiHeaderSection grow={false} side='left' >
                    <EuiHeaderSectionItem>
                        <EuiHeaderLogo iconType={'logoAppSearch'}>SHOP</EuiHeaderLogo>
                    </EuiHeaderSectionItem>
                    <EuiHeaderSectionItem>
                        <NavLinkButton to="/products" label='Products' />
                    </EuiHeaderSectionItem>
                    <EuiHeaderSectionItem>
                        <NavLinkButton to="/purchases" label='Purchases' />
                    </EuiHeaderSectionItem>
                    <EuiHeaderSectionItem>
                        <NavLinkButton to="/units" label='Units' iconType="help" />
                    </EuiHeaderSectionItem>
                    <EuiHeaderSectionItem>
                        <NavLinkButton to="/statistic" label='Statistic' iconType="documentation" />
                    </EuiHeaderSectionItem>
                </EuiHeaderSection >


                {/* right */}
                < EuiHeaderSection grow={false} side='right' >

                    <EuiHeaderSectionItem>
                        <EuiHeaderSectionItemButton aria-label='Account Menu'>
                            <EuiAvatar name='Your Name' size='s' />
                        </EuiHeaderSectionItemButton>
                    </EuiHeaderSectionItem>

                </EuiHeaderSection >
            </EuiHeader >

            {/* BOTTOM HEADER */}
            < EuiHeader theme={colorMode.toLowerCase() as ColorModeType} position='fixed'>
                {/* {breadcrumbArray} */}
                {breadcrumbArrayProp && 
                <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbArrayProp}/>}
            </EuiHeader >
        </>
    )
})

type PropsType = {

}