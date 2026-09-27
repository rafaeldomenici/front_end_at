
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ListarFuncionarios() {

    const [funcionarios, setFuncionarios] = useState([]);

  const buscarFuncionarios = () => {
    fetch("http://localhost:8080/funcionarios")
      .then(response => response.json())
      .then(data => {
        setFuncionarios(data);
      });

  };

  useEffect(() => { 
    buscarFuncionarios();
  }, []);



  return (
    <div>
      <h1>Listar Funcionários</h1>
      {funcionarios.map( item => (
        <p>Nome: {item.nome} - E-mail:{item.email}</p>
      )
      )}
      
    </div>
  )
}