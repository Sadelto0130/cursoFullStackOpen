const Login = ({
  userName,
  setUserName,
  password,
  setPassword,
  setRegister,
  register,
  onSubmit,
  name,
  setName,
}) => {

  const handleUserName = (e) => setUserName(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <p>
        Username: <input value={userName} onChange={handleUserName} />
      </p>
      {register && (
        <p>
          Name: <input value={name} onChange={handleName} />
        </p>
      )}
      <p>
        Password:{" "}
        <input type="password" value={password} onChange={handlePassword} />
      </p>
      <button type="submit" onClick={() => setRegister(false)}>
        Login
      </button>
      <button type="submit" onClick={() => setRegister(true)}>
        Register
      </button>
    </form>
  );
};

export default Login;
