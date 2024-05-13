import { Link, useMatch } from 'react-router-dom';

const CustomLink = ({children, to, ...props}) => {
    const match = useMatch(to);

    return (
        <Link
            to={to}
            style={{
                color: match ? '#FFE4E1' : 'white',
                textDecoration: match ? '' : 'none',
            }}
            {...props}
        >
            {children}
        </Link>
    )
}

export {CustomLink};