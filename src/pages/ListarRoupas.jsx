
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ListarRoupas() {

    const [roupas, setRoupas] = useState([]);

  const buscarRoupas = () => {
    fetch("http://localhost:8080/roupas")
      .then(response => response.json())
      .then(data => {
        setRoupas(data);
      });

  };

  useEffect(() => { 
    buscarRoupas();
  }, []);



  return (
    <div>
      <h1>Listar Roupas</h1>
      {roupas.map( item => (
        <p>Nome: {item.nome} - Genero:{item.genero}</p>
      )
      )}
      
    </div>
  )
}