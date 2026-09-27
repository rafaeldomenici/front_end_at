import { Link, Outlet } from "react-router-dom";
import "../index.css";
export default function Layout() {
    return (
      <> 
        <div>
            <nav>
                <ul className="menu">
                    <li>
                         <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/cadastrarRoupa"}>Cadastrar Roupa</Link>
                    </li>
                    <li>
                        <Link to={"/listarRoupas"}>Listar Roupas</Link>
                    </li>
                    <li>
                        <Link to={"/cadastrarFuncionario"}>Cadastrar Funcionário</Link>
                    </li>
                    <li>
                        <Link to={"/listarFuncionarios"}>Listar Funcionários</Link>
                    </li>
                    <li>
                        <Link to={"/cadastrarCliente"}>Cadastrar Cliente</Link>
                    </li>
                    <li>
                        <Link to={"/listarClientes"}>Listar Clientes</Link>
                    </li>
                    <li>
                        <Link to={"/realizarVenda"}>Realizar Venda</Link>
                    </li>
                    <li>
                        <Link to={"/listarVendas"}>Listar Vendas</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <Outlet/>
      </>

    )
}