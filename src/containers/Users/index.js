import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import axios from "axios";
import {
  Container,
  Image,
  ContainerItens,
  H1,
  Button,
  User,
} from "./styles.js";
import Avatar from "../../assets/users.svg";
import Arrow from "../../assets/arrow.svg";
import Trash from "../../assets/trash.svg";

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory()

  useEffect(() => {
    async function fetchUsers() {
      const { data: newUsers } = await axios.get("http://localhost:3001/users");
    
      setUsers(newUsers);
    }

    fetchUsers()
  }, [users])

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)

    const newUsers = users.filter((user) => user.id !== userId);

    setUsers(newUsers);
  }

  function goBackPage() {
    history.push("/");
  }

  return (
    <Container>
      <Image alt="logo-img" src={Avatar} />
      <ContainerItens>
        <H1>Usuários</H1>

        <ul>
          {users.map((user) => (
            <User key={user.id}>
              <p> {user.name}</p> -- <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img alt="trash-icon" src={Trash} />
              </button>
            </User>
          ))}
        </ul>

        <Button onClick={goBackPage}>
        <img alt="arrow-icon" src={Arrow} /> Voltar
        </Button>

      </ContainerItens>
    </Container>
  );
};

export default Users;
