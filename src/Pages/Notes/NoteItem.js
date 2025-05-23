function NavItem({id, data}) {
    return (<a href={'Notes/' + id} className="noteItem"><h2>{data.title}</h2> <p>{data.description.slice(0,50)}</p></a>);
}

export default NavItem;