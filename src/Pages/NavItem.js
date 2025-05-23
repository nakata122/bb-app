import { Link } from "react-router-dom";

function NavItem({name}) {
    return (<Link to={name} className="navItem"><img src={name + '.png'}></img>{name}</Link>);
}

export default NavItem;