import { Link } from "react-router-dom";

function NavItem({id, data}) {
    return (<Link to={'./' + id} className="noteItem"><h2>{data.title}</h2> <p>{data.description.slice(0,50)}</p></Link>);
}

export default NavItem;