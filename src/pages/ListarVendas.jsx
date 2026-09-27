
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ListarVendas() {

    const [vendas, setVendas] = useState([]);

  const buscarVendas = async () => {
    let vendasAux = []
      await fetch("http://localhost:8080/vendas")
      .then(response => response.json())
      .then(data => {
        vendasAux = data;
      });
    for(let venda of vendasAux) {
        for(let itemVenda of venda.itensVenda) {
            await fetch(`http://localhost:8080/itensvenda/obter_roupa/${itemVenda.id}`)
                .then(response => response.json())
                .then(data => {
                itemVenda.nome = data.nome;
                itemVenda.tamanho = data.tamanho;
                itemVenda.preco = data.preco;
                itemVenda.genero = data.genero;
            });

        }
    }
    setVendas(vendasAux);
  }

  function teste() {
    console.log(vendas);
  }
  

  useEffect(() => { 
    buscarVendas();
  }, []);

  function calcularTotal(itensVenda) {
    let total = 0;
    for(let item of itensVenda) {
        total += item.preco*item.quantidade;
    }
    return total;
  }

  return  (
    <div>
    <h1>Listar Vendas</h1>
       
        {vendas.map( (venda) => 
        <div>
            <p>Id: {venda.id}</p>
           
            <div style={{marginLeft: "50px"}}>
                {venda.itensVenda.map( (item) => <p>Nome: {item.nome} - Preço: {item.preco} Quantidade: {item.quantidade}- Subtotal: {item.preco*item.quantidade}</p>)}
                <p style={{fontWeight: "bold"}}>Total:{calcularTotal(venda.itensVenda)}</p>
            </div>
        </div>
        )}
        
        
        

        <button onClick={teste}>Teste</button>
    </div>
    )
}