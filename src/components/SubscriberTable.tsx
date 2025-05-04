// src/components/SubscriberTable.tsx
import React from 'react';

type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
};

interface Props {
  subscribers: Subscriber[];
}

const SubscriberTable: React.FC<Props> = ({ subscribers }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Subscribers</h2>
      {subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="bg-white even:bg-gray-50">
                  <td className="p-2 border">{subscriber.id}</td>
                  <td className="p-2 border">{subscriber.email}</td>
                  <td className="p-2 border">{subscriber.subscribed_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriberTable;
