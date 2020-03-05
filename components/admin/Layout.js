import 'styles/admin/Layout.sass'

const AdminLayout = (props) => (
    <>
        <div className='admin-header'></div>
        <div className='admin-body'>{props.children}</div>
        <div className='admin-footer'></div>
    </>
);

export default AdminLayout;