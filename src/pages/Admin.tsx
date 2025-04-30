import React, { useState, useEffect } from 'react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated (stored in localStorage)
  useEffect(() => {
    const authToken = localStorage.getItem('adminAuthToken');
    if (authToken) {
      setIsAuthenticated(true);
      fetchData(authToken);
    }
  }, []);

  // Fetch subscribers and messages from the backend
  const fetchData = async (authToken: string) => {
    try {
      // Fetch subscribers
      const subscribersResponse = await fetch('https://clue-analytics-backend.onrender.com/subscribers', {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      });
      if (!subscribersResponse.ok) {
        throw new Error('Failed to fetch subscribers');
      }
      const subscribersData = await subscribersResponse.json();
      setSubscribers(subscribersData);

      // Fetch messages
      const messagesResponse = await fetch('https://clue-analytics-backend.onrender.com/messages', {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      });
      if (!messagesResponse.ok) {
        throw new Error('Failed to fetch messages');
      }
      const messagesData = await messagesResponse.json();
      setMessages(messagesData);
    } catch (err: any) {
      setError(err.message);
      setIsAuthenticated(false);
      localStorage.removeItem('adminAuthToken');
    }
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Create basic auth token (base64 encoded username:password)
    const authToken = btoa(`${username}:${password}`);

    try {
      // Test authentication by fetching subscribers
      const response = await fetch('https://clue-analytics-backend.onrender.com/subscribers', {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // If successful, store the auth token and fetch data
      localStorage.setItem('adminAuthToken', authToken);
      setIsAuthenticated(true);
      fetchData(authToken);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    setIsAuthenticated(false);
    setSubscribers([]);
    setMessages([]);
    setUsername('');
    setPassword('');
  };

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    );
  }

  // Render dashboard if authenticated
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Subscribers</h2>
      {subscribers.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">ID</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">Email</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="bg-white dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{subscriber.id}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{subscriber.email}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{subscriber.subscribed_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-8">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">ID</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">Name</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">Email</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">Message</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="bg-white dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{message.id}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{message.name}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{message.email}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{message.message}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{message.sent_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
