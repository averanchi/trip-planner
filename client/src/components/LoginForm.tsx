import React from "react";
import { Context } from "../main";

const LoginForm = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const { store } = React.useContext(Context);
    return (
        <div>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Register</button>
        </div>
    );
};

export default LoginForm;