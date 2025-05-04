import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import SubscriberTable from '../components/SubscriberTable';
import MessageTable from '../components/MessageTable';

const auth = getAuth(app);

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        const idToken = await user.getIdToken();
        fetchData(idToken);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (idToken: string) => {
    try {
      const subscribersResponse = await fetch('https://europe-west1-clue-analytics.cloudfunctions.net/api/subscribers', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!subscribersResponse.ok) throw new Error('Failed to fetch subscribers');
      const subscribersData = await subscribersResponse.json();
      setSubscribers(subscribersData);

      const messagesResponse = await fetch('https://europe-west1-clue-analytics.cloudfunctions.net/api/messages', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!messagesResponse.ok) throw new Error('Failed to fetch messages');
      const messagesData = await messagesResponse.json();
      setMessages(messagesData);
    } catch (err: any) {
      setError(err.message);
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('adminIdToken', idToken);
      setIsAuthenticated(true);
      fetchData(idToken);
    } catch (err: any) {
      setError('Invalid credentials or authentication failed');
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('adminIdToken');
      setIsAuthenticated(false);
      setSubscribers([]);
      setMessages([]);
      setUsername('');
      setPassword('');
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-sm font-medium text-gray-500">Total Subscribers</h2>
          <p className="text-2xl font-bold text-blue-600">{subscribers.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-sm font-medium text-gray-500">Total Messages</h2>
          <p className="text-2xl font-bold text-green-600">{messages.length}</p>
        </div>
      </div>

      <SubscriberTable subscribers={subscribers} />
      <div className="mt-12">
        <MessageTable messages={messages} />
      </div>
    </div>
  );
};

export default Admin;

