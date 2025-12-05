import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
export default function TOC() {
  return (
    <Nav variant="pills">
      <NavItem>
        <Link href="/Labs">
          <NavLink as="a">Labs</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab1">
          <NavLink as="a">Lab 1</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab2">
          <NavLink as="a">Lab 2</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab3">
          <NavLink as="a">Lab 3</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/">
          <NavLink as="a">Kambaz</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/rjmcnamara10/kambaz-next-js">
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}
