import { EuiIcon } from '@elastic/eui'
import { EuiIconType } from '@elastic/eui/src/components/icon/icon'
import { NavLink, useLocation } from 'react-router-dom'
import style from "./NavLinkButton.module.css"

export const NavLinkButton: React.FC<PropsType & {
    activeColor?: string,
    inactiveColor?: string,
    iconType?: EuiIconType
}> = (props) => {
    let location = useLocation()

    const activeColor = props.activeColor ? props.activeColor : '#3a96d7';
    const inactiveColor = props.inactiveColor ? props.inactiveColor : '#ffffff'

    const isActive = location.pathname === props.to ? true : false

    return (
        <>
            {/* <span className={style.navlinkbuttonwrapper}>
                <button className={style.navlinkbuttoncontainer}>
           
                    <EuiIcon type="aggregate" color={isActive ? activeColor : inactiveColor} />
                    <span style={{ paddingLeft: 8, paddingRight: 8 }}>
                        <NavLink

                            to={props.to}
                            className={style.navlinkbutton}
                            style={
                                ({ isActive }) =>
                                ({
                                    color: isActive
                                        ?
                                        activeColor
                                        :
                                        inactiveColor,
                                })
                            }>
                            {props.label}
                            
                        </NavLink>
                    </span>
                </button >
            </span> */}
            <span className={style.navlinkbuttonwrapper}>
                <span className={style.navlinkbuttoncontainer} style={{ paddingLeft: props.iconType ? 8 : 0 }}>
                    <NavLink

                        to={props.to}
                        className={style.linkButton}
                        style={
                            ({ isActive }) =>
                            ({
                                color: isActive
                                    ?
                                    activeColor
                                    :
                                    inactiveColor,
                            })
                        }>
                        {
                            props.iconType && <EuiIcon type={props.iconType as string} color={isActive ? activeColor : inactiveColor} />
                        }

                        <span style={{ paddingLeft: 8, paddingRight: 8 }}>
                            {props.label}
                        </span>
                    </NavLink>

                </span >
            </span >

        </>

    )
    // return (
    //     <span className={style.navlinkbuttonwrapper}>
    //         <button className={style.navlinkbuttoncontainer}>
    //             {/* content */}
    //             <EuiIcon type="aggregate" color={isActive ? activeColor : inactiveColor} />
    //             <span style={{ paddingLeft: 8, paddingRight: 8 }}>
    //                 <NavLink

    //                     to={props.to}
    //                     className={style.navlinkbutton}
    //                     style={
    //                         ({ isActive }) =>
    //                         ({
    //                             color: isActive
    //                                 ?
    //                                 activeColor
    //                                 :
    //                                 inactiveColor,
    //                         })
    //                     }>
    //                     {props.label}
    //                     {/* <EuiTextColor color="#3a96d7">Products</EuiTextColor> */}
    //                 </NavLink>
    //             </span>
    //         </button >
    //     </span>

    // )
}

export type PropsType = {
    to: string,
    label: string,
}
