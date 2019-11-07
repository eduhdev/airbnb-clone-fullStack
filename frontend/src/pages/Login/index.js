import React, {useState} from 'react';
import api from '../../services/api';

 
function Login({ history }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: response } = await api.post('/sessions', {email});

    const {_id} = response;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }

  return (
    <>
      <p>Show <strong>spots</strong> to developers and find <strong>talents</strong> to your company</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail *</label>
        <input type="email" id="email" placeholder="Your best email" onChange={e => setEmail(e.target.value)} value={email}/>
        <button className="btn" type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
