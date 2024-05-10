import { Link, useMatch } from 'react-router-dom';

const CustomLink = ({children, to, ...props}) => {
    const match = useMatch(to);

    return (
        <Link
            to={to}
            style={{
                color: match ? 'black' : 'grey',
                textDecoration: match ? '' : 'none',
            }}
            {...props}
        >
            {children}
        </Link>
    )
}

export {CustomLink};