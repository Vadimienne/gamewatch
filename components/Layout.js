import Link from 'next/link'

import 'styles/Layout.sass'

import Logo from 'icons/SVG/addtolibrary.svg'
import Svg from 'components/Svg' 

const Layout = (props) => (
    <>
        <div className='header'>
        </div>
        <div className='body'>
            {props.children}
        </div>
        <div className='footer'></div>
    </>
);

export default Layout;