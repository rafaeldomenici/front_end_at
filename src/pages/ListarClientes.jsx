
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ListarClientes() {

    const [clientes, setClientes] = useState([]);

  const buscarClientes = () => {
    fetch("http://localhost:8080/clientes")
      .then(response => response.json())
      .then(data => {
        setClientes(data);
      });

  };

  useEffect(() => { 
    buscarClientes();
  }, []);



  return (
    <div>
      <h1>Listar Clientes</h1>
      {clientes.map( item => (
        <p>Nome: {item.nome} - E-mail:{item.email}</p>
      )
      )}
      
    </div>
  )
}