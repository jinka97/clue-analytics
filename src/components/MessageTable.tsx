// src/components/MessageTable.tsx
import React from 'react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  sent_at: string;
};

interface Props {
  messages: Message[];
}

const MessageTable: React.FC<Props> = ({ messages }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="bg-white even:bg-gray-50">
                  <td className="p-2 border">{msg.id}</td>
                  <td className="p-2 border">{msg.name}</td>
                  <td className="p-2 border">{msg.email}</td>
                  <td className="p-2 border max-w-xs whitespace-pre-wrap">{msg.message}</td>
                  <td className="p-2 border">{msg.sent_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessageTable;
