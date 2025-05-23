function NavItem({name}) {
    return (<a href={name} className="navItem"><img src={name + '.png'}></img>{name}</a>);
}

export default NavItem;