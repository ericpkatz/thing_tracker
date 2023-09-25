import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Users from './Users';
import Things from './Things';

const App = ()=> {
  const [users, setUsers] = useState([]);
  const [things, setThings] = useState([]);

  useEffect(()=> {
    const fetchUsers = async()=> {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  useEffect(()=> {
    const fetchThings = async()=> {
      const response = await axios.get('/api/things');
      setThings(response.data);
    }
    fetchThings();
  }, []);

  const addOwner = async(thing, user)=> {
    thing = {...thing, user_id: user.id};
    const response = await axios.put(`/api/things/${thing.id}`, thing);
    thing = response.data;
    setThings(things.map(_thing => _thing.id === thing.id ? thing : _thing));
  }

  const removeOwner = async(thing)=> {
    thing = {...thing, user_id: null};
    const response = await axios.put(`/api/things/${thing.id}`, thing);
    thing = response.data;
    setThings(things.map(_thing => _thing.id === thing.id ? thing : _thing));
  }

  return (
    <div>
      <h1>Thing Tracker</h1>
      <main>
        <Users users={ users } things={ things } />
        <Things
          addOwner={ addOwner }
          removeOwner={ removeOwner }
          users={ users }
          things={ things }
        />
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
