import 'styles/adminLayout.sass'

const AdminLayout = (props) => (
    <>
        <div className='admin-header'></div>
        <div className='admin-body'>{props.children}</div>
    </>
);

export default AdminLayout;