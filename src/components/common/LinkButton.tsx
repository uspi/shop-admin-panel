import { EuiIcon } from '@elastic/eui'
import { EuiIconType } from '@elastic/eui/src/components/icon/icon'
import { NavLink, useLocation } from 'react-router-dom'
import style from "./LinkButton.module.css"

export const LinkButton: React.FC<PropsType & {
    iconType?: EuiIconType
}> = (props) => {
    return (
        <>
            <span className={style.navlinkbuttonwrapper}>

                <NavLink
                    to={props.to}
                    className={style.navlinkbuttoncontainer}
                    style={{ color: '#0061A6' }}>
                    {
                        props.iconType && <EuiIcon type={props.iconType as string} color='#0061A6' />
                    }

                    <span className={style.label}>
                        {props.label}
                    </span>
                    {/* <span style={{ paddingLeft: 8, paddingRight: 8 , }}>
                            {props.label}
                        </span> */}
                </NavLink>


            </span >

        </>
    )
}

export type PropsType = {
    to: string,
    label: string,
}
