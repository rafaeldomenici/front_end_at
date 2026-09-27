import { useState } from "react"

export default function CadastrarFuncionario() {

    const [dadosFuncionario, setDadosFuncionario] = useState({nome:'',email:'',telefone:'',salario:0});

    function cadastrarFuncionario() {
       fetch("http://localhost:8080/funcionarios", {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosFuncionario),
       })
       alert('Funcionario cadastrado com sucesso!');
      
    }




    return (
        <>
         <h1>Cadastro de Funcionarios</h1>
         <form>
            <p>Nome</p>
            <input type="text" value={dadosFuncionario.nome} onChange={(e) => setDadosFuncionario({...dadosFuncionario ,nome:e.target.value})}/>
            <p>E-mail</p>
            <input type="text" value={dadosFuncionario.email} onChange={(e) => setDadosFuncionario({...dadosFuncionario ,email:e.target.value})}/>
            <p>Telefone</p>
            <input type="text" value={dadosFuncionario.telefone} onChange={(e) => setDadosFuncionario({...dadosFuncionario ,telefone:e.target.value})}/>
            <p>Salario</p>
            <input type="text" value={dadosFuncionario.salario} onChange={(e) => setDadosFuncionario({...dadosFuncionario ,salario:e.target.value})}/>
            <br/>
            <button onClick={cadastrarFuncionario}>Enviar</button>
         </form>
        </>
    )
}