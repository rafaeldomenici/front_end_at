import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import CadastrarRoupa from './pages/CadastrarRoupa';
import ListarRoupas from './pages/ListarRoupas';
import Layout from './pages/Layout';
import CadastrarFuncionario from './pages/CadastrarFuncionario';
import ListarFuncionarios from './pages/ListarFuncionarios';
import CadastrarCliente from './pages/CadastrarCliente';
import ListarClientes from './pages/ListarClientes';
import RealizarVenda from './pages/RealizarVenda';
import ListarVendas from './pages/ListarVendas';
function App() {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="cadastrarRoupa" element={<CadastrarRoupa />} />
          <Route path="listarRoupas" element={<ListarRoupas />} />
          <Route path="cadastrarFuncionario" element={<CadastrarFuncionario />} />
          <Route path="listarFuncionarios" element={<ListarFuncionarios />} />
          <Route path="cadastrarCliente" element={<CadastrarCliente />} />
          <Route path="listarClientes" element={<ListarClientes />} />
          <Route path="realizarVenda" element={<RealizarVenda />} />
          <Route path="listarVendas" element={<ListarVendas />} />
        </Route>
      </Routes>
    </Router>
  )

}

export default App;
