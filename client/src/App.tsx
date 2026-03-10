import { useEffect } from "react"
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import React from "react";
import { observer } from "mobx-react-lite";
import type { IUser } from "./models/response/IUser";
import UserService from "./services/UserService";

const App = observer(() => {
  const { store } = React.useContext(Context);
  const [users, setUsers] = React.useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      console.log(response);
      setUsers(response.data);
    } catch (e) { console.log(e) }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return <LoginForm />
  }

  return (
    <>
      <h1>{store.isAuth ? `You are logged in under ${store.user.email}` : "Please log in"}</h1>
      <h3>{store.user.isActivated ? "Account is activated" : "Account is not activated"}  </h3>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={() => getUsers()}>Get all users</button>
      </div>
      {users.length > 0 && (
        <>
          <div>
            {users.map(user => (
              <div key={user.email}>{user.email}</div>
            ))}
          </div>

        </>
      )}
    </>
  )
});


export default App;
