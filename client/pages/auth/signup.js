import { useState } from 'react';
export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="d-flex card "
      style={{
        width: '30rem',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        backgroundColor: 'mediumturquoise',
      }}
    >
      <h1 style={{ alignSelf: 'center', color: 'darkgoldenrod' }}>Sign Up</h1>
      <div className="form-group" style={{ alignSelf: 'center' }}>
        <label>Email Address</label>
        <input
          className="form-control w-10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group" style={{ alignSelf: 'center' }}>
        <label>Password</label>
        <input
          className="form-control w-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-2" style={{ alignSelf: 'center' }}>
        Signup
      </button>
    </form>
  );
};
