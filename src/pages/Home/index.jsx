import { useEffect, useState, useRef } from "react";
import "./style.css";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // para armazenar erros.

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers();
    } catch (err) {
      setError("Erro ao excluir usuário.");
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1 className="title">Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" name="name" ref={inputName} />
        <input placeholder="Idade" type="text" name="age" ref={inputAge} />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              E-mail: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
