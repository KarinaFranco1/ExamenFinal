import './App.css';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppstoreOutlined } from '@ant-design/icons';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import Pokemon from './components/Pokemon';


const { Header, Footer, Content } = Layout;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function AppMenu() {
  const [current, setCurrent] = useState()
  return (
    // Definicion del menu principal
    <Menu onClick={(value) => setCurrent(value)} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="pokemon" icon={<AppstoreOutlined />}>
        <Link to="/cards">Lista de Pokemones</Link>
      </Menu.Item>
    </Menu>
  );
}

function PokemonsRoutes({ match }) {
  return (
    <>
      <Route exact path={`${match.path}/new`} component={Pokemon} />
      <Route
        exact
        path={`${match.path}/edit/:pokemonId`}
        component={Pokemon}
      />
      <Route exact path={`${match.path}/`} component={Pokemon} />
    </>
  );
}
function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ color: 'white' , fontSize: 30, textAlign: 'center'}}>
            <div>Pokemones</div>
        </Header>
        <Content>
            
            <div className="site-layout-content">
                <AppMenu/>
                <br/>
                {/* Secccion donde se van a mostrar los diferentes componentes que rendericemos */}
                <>
                  <Route path="/pokemons" exact component={PokemonsRoutes} />
                </>
            </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
            <p>Teléfono</p>
            <p>Dirección</p>
            <p>Ciudad - País</p>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
