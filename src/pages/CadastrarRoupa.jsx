import { useState } from "react"

export default function CadastrarRoupa() {

    const [dadosRoupa, setDadosRoupa] = useState({nome:'',tamanho:'',preco:0,genero:'',quantidadeEmEstoque:0});

    function cadastrarRoupa() {
       fetch("http://localhost:8080/roupas", {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosRoupa),
       })
       alert('Roupa cadastrada com sucesso!');
      
    }




    return (
        <>
         <h1>Cadastro de Roupas</h1>
         <form>
            <p>Nome</p>
            <input type="text" value={dadosRoupa.nome} onChange={(e) => setDadosRoupa({...dadosRoupa ,nome:e.target.value})}/>
            <p>Tamanho</p>
            <select value={dadosRoupa.tamanho} onChange={(e) => setDadosRoupa({...dadosRoupa ,tamanho:e.target.value})}>
                <option value='P'>P</option>
                <option value='M'>M</option>
                <option value='G'>G</option>
                <option value='GG'>GG</option>
            </select>
            <p>Preço</p>
            <input type="text" value={dadosRoupa.preco} onChange={(e) => setDadosRoupa({...dadosRoupa ,preco:e.target.value})}/>
            <p>Genero</p>
            <select value={dadosRoupa.genero} onChange={(e) => setDadosRoupa({...dadosRoupa ,genero:e.target.value})}>
                <option value='Masculino'>Masculino</option>
                <option value='Feminino'>Feminino</option>
            </select>
            <p>Quantidade em estoque</p>
            <input type="text" value={dadosRoupa.quantidadeEmEstoque} onChange={(e) => setDadosRoupa({...dadosRoupa ,quantidadeEmEstoque:e.target.value})}/>
            <br />
            <button onClick={cadastrarRoupa}>Enviar</button>
         </form>
        </>
    )
}