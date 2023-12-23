import ALink from '../components/admin/aLink';
import { useAuth } from '../components/admin/authentication/authProvider';

const AdminHeader = () => {

    var auth = useAuth();

    const Logout = (e) => {

        e.preventDefault();
        auth.Logout();
    }

    return(
        <header>
            <ul>
                <li><ALink href="/settings"><a><img className="user" src="/images/admin/svg/user.svg" /></a></ALink></li>
                <li><a onClick={(e) => Logout(e)} href="#"><img src="/images/admin/svg/logout.svg" /></a></li>
            </ul>
        </header>
    )

}

export default AdminHeader;