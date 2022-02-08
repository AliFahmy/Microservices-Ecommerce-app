import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (data) => Router.push('/'),
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
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
      }}
    >
      <h1 style={{ alignSelf: 'center', color: 'darkgoldenrod' }}>Sign Up</h1>
      <div className="form-group" style={{ alignSelf: 'center' }}>
        <label>Email Address</label>
        <input
          className="form-control w-10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="invalid-feedback">Please Enter Email.</div>
      </div>
      <div className="form-group" style={{ alignSelf: 'center' }}>
        <label>Password</label>
        <input
          className="form-control w-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errors}
      <button className="btn btn-primary mt-2" style={{ alignSelf: 'center' }}>
        Signup
      </button>
    </form>
  );
};
