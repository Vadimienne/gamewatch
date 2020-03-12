import Link from 'next/link'

import 'styles/admin/Layout.sass'

const AdminLayout = (props) => (
    <>
        <div className='admin-header'></div>
        <div className='admin-body'>
            <div className='admin-navigation'>
                <Link href='/adminhub/games'><a>Игры</a></Link>
                <Link href='/adminhub/studios'><a>Студии</a></Link>
                <Link href='/adminhub/publishers'><a>Издатели</a></Link>
                <Link href='/adminhub/genres'><a>Жанры</a></Link>
                <Link href='/adminhub/platforms'><a>Платформы</a></Link>
                <Link href='/adminhub/age-restrictions'><a>👶</a></Link>
            </div>
            {props.children}
        </div>
        <div className='admin-footer'></div>
    </>
);

export default AdminLayout;