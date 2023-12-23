import Link from 'next/link';
import {ADMIN_URL } from '../../config';

const ALink = ({children,href}) => {
    return(
        <Link href={"/" + ADMIN_URL + href}>{children}</Link>
    )
}

export default ALink;