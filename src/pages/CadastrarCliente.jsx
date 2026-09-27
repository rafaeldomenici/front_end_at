import { useState } from "react"

export default function CadastrarCliente() {

    const [dadosCliente, setDadosCliente] = useState({nome:'',email:'',telefone:''});

    function cadastrarCliente() {
       fetch("http://localhost:8080/clientes", {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCliente),
       })
       alert('Cliente cadastrado com sucesso!');
      
    }




    return (
        <>
         <h1>Cadastro de Clientes</h1>
         <form>
            <p>Nome</p>
            <input type="text" value={dadosCliente.nome} onChange={(e) => setDadosCliente({...dadosCliente ,nome:e.target.value})}/>
            <p>E-mail</p>
            <input type="text" value={dadosCliente.email} onChange={(e) => setDadosCliente({...dadosCliente ,email:e.target.value})}/>
            <p>Telefone</p>
            <input type="text" value={dadosCliente.telefone} onChange={(e) => setDadosCliente({...dadosCliente ,telefone:e.target.value})}/>
            <br />
            <button onClick={cadastrarCliente}>Enviar</button>
         </form>
        </>
    )
}