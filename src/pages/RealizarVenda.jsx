
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../index.css";

export default function RealizarVenda() {

    const [clientes, setClientes] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [roupas, setRoupas] = useState([]);
    const [roupaSelecionada, setRoupaSelecionada] = useState({});
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(0);
    const [clienteSelecionado, setClienteSelecionado] = useState(0);
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [carrinho, setCarrinho] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagamentos, setPagamentos] = useState([]);
    const [parcelas, setParcelas] = useState(1);


  const buscarClientes = () => {
    fetch("http://localhost:8080/clientes")
      .then(response => response.json())
      .then(data => {
        setClientes(data);
      });

  };
  const buscarFuncionarios = () => {
    fetch("http://localhost:8080/funcionarios")
      .then(response => response.json())
      .then(data => {
        setFuncionarios(data);
      });

  };

  const buscarRoupas = () => {
    fetch("http://localhost:8080/roupas")
      .then(response => response.json())
      .then(data => {
        setRoupas(data);
      });

  };

  const buscarVendas = () => {
    fetch("http://localhost:8080/vendas")
      .then(response => response.json())
      .then(data => {
        setVendas(data);
      });
    console.log(vendas);
  };

  const buscarPagamentos = () => {
    fetch("http://localhost:8080/vendas/obterPagamentos")
      .then(response => response.json())
      .then(data => {
        setPagamentos(data);
      });
    console.log(pagamentos);
  };

  useEffect(() => { 
    buscarClientes();
    buscarFuncionarios();
    buscarRoupas();
    buscarVendas();
    buscarPagamentos();
  }, []);

  function obterRoupa(event) {
    let roupa = roupas.find(item => item.id == event.target.value);
    setRoupaSelecionada(roupa)
    setQuantidade(0);
  }

  function obterPagamento(event) {
    let tipo = event.target.value;
    if(tipo == 1) {
      setPagamentoSelecionado("Dinheiro");
    }
    else if(tipo == 2) {
      setPagamentoSelecionado("Cartão de crédito");
    }
    else {
      setPagamentoSelecionado("PIX");
    }

  }

  function diminuirQuantidade() {
    if(quantidade > 0) {
        setQuantidade(prev => prev - 1);
    }
  }

  function aumentarQuantidade() {
    if(quantidade < roupaSelecionada.quantidadeEmEstoque) {
        setQuantidade(prev => prev + 1);
    }
  }

  function diminuirQuantidadeParcelas() {
    if(parcelas > 0) {
        setParcelas(prev => prev - 1);
    }
  }

  function aumentarQuantidadeParcelas() {
  
        setParcelas(prev => prev + 1);
    
  }
  
  function adicionarCarrinho() {
    let itemCarrinho = {};
    itemCarrinho.roupa = roupaSelecionada;
    itemCarrinho.quantidade = quantidade;
    setCarrinho([...carrinho, itemCarrinho])
    setTotal(prev => prev + (roupaSelecionada.preco*quantidade));
  }

  function obterFuncionario(event) {
    setFuncionarioSelecionado(event.target.value);
  }

  function obterCliente(event) {
    setClienteSelecionado(event.target.value);
  }

  async function finalizarVenda(event) {
    event.preventDefault();
    let dadosVenda = {descricao: "teste"};
    
    await fetch(`http://localhost:8080/vendas?idCliente=${clienteSelecionado}&idFuncionario=${funcionarioSelecionado}`, {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosVenda),
       })
    
    buscarVendas();
    let ultimaVenda = vendas[vendas.length-1].id + 1;
    console.log(ultimaVenda);
    for(let item of carrinho) {
        let objQuantidade = {quantidade : item.quantidade};

        await fetch(`http://localhost:8080/itensvenda?idVenda=${ultimaVenda}&idRoupa=${item.roupa.id}`, {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objQuantidade),
       })
    }
    let pagamento = {};
    pagamento.tipo = pagamentoSelecionado;
    if(parcelas == 1) {
      pagamento.aVista = true;
    }
    else {
      pagamento.aVista = false;
    }
    pagamento.parcelas = parcelas;
    pagamento.idVenda = ultimaVenda;
    console.log(pagamento);

    await fetch(`http://localhost:8081/cadastrar`, {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pagamento),
       })

    

    

    alert("Venda realizada com sucesso");
    
  }
  
  function removerItemCarrinho(itemCarrinho, idx) {
    setTotal(prev => prev - itemCarrinho.roupa.preco*itemCarrinho.quantidade);
    let novoCarrinho = carrinho.filter((item,index) => index != idx);
    setCarrinho(novoCarrinho);
  }

  return (
    <div className="principalVenda">
        <div className="selecaoRoupas">
        <select onChange={obterFuncionario}>
            <option value="-1">Selecione o funcionário</option>
            {funcionarios.map( item => (
            <option value={item.id}>{item.nome}</option>
            )
            )}
        </select>
        <select onChange={obterCliente}>
            <option value="-1">Selecione o cliente</option>
            {clientes.map( item => (
            <option value={item.id}>{item.nome}</option>
            )
            )}
        </select>
        <select onChange={obterRoupa}>
            <option value="-1">Selecione a roupa</option>
            {roupas.map( item => (
            <option value={item.id}>{item.nome}</option>
            )
            )}
        </select>
        <select onChange={obterPagamento}>
            <option value="-1">Selecione a forma de pagamento</option>
            <option value={1}>Dinheiro</option>
            <option value={2}>Cartão de crédito</option>
            <option value={3}>PIX</option>
        </select>
        <p>Forma de pagamento: {pagamentoSelecionado}</p>
        <p>Nome: {roupaSelecionada.nome}</p>
        <p>Tamanho: {roupaSelecionada.tamanho}</p>
        <p>Preço: {roupaSelecionada.preco}</p>
        <p>Gênero: {roupaSelecionada.genero}</p>
        <p>Quantidade em estoque: {roupaSelecionada.quantidadeEmEstoque}</p>
        <p>Selecione a quantidade a ser vendida:</p>
        <button onClick={diminuirQuantidade}>-</button>{quantidade}<button onClick={aumentarQuantidade}>+</button>
        
        </div>
        <button className="botaoadicionar" onClick={adicionarCarrinho}>Adicionar ao carrinho</button>
        <div className="carrinho">
            <h2>Carrinho</h2>
            {carrinho.map( (item,index) => (
                <div className="itemCarrinho">
                    <p>{item.roupa.nome}</p>
                    <p style={{marginLeft: '20px'}}>Quantidade: {item.quantidade}</p>
                    <button onClick={() => removerItemCarrinho(item,index)}>Remover</button>
                </div>
            ))}
        <h1>Total a pagar: {total}</h1>
        </div>
        <div>
          <p>Quantidade de parcelas:</p>
          <button onClick={diminuirQuantidadeParcelas}>-</button>{parcelas}<button onClick={aumentarQuantidadeParcelas}>+</button>
          <button className="botaovenda" onClick={finalizarVenda}>Finalizar Venda</button>
        </div>
    </div>
  )
}