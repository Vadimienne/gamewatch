import Link from 'next/link'

import 'styles/Layout.sass'

import Logo from 'icons/SVG/addtolibrary.svg'
import Svg from 'components/Svg' 

const AdminLayout = (props) => (
    <>
        <div className='admin-header'>
        </div>
        <div className='admin-body'>
            {props.children}
        </div>
        <div className='admin-footer'></div>
    </>
);

export default AdminLayout;