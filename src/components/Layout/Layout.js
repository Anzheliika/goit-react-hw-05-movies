import { Container } from 'pages/MovieDetails/MovieDetails.styled';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Header, Nav, NavItem } from './Layout.styled';

const Layout = () => {
  return (
    <Container>
      <Header>
        <Nav>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/movies">Movies</NavLink>
          </NavItem>
        </Nav>
      </Header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};

export default Layout;
