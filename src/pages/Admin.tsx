import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import { User } from './User';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'admin1', email: 'admin1@example.com', password: 'password1' },
    { id: 2, username: 'admin2', email: 'admin2@example.com', password: 'password2' },
    { id: 3, username: 'admin3', email: 'admin3@example.com', password: 'password3' },
  ]);

  const [accessCount, setAccessCount] = useState<number>(() => {
    const storedAccessCount = localStorage.getItem('accessCount');
    return storedAccessCount ? parseInt(storedAccessCount, 10) : 0;
  });

  const [month, setMonth] = useState([
    { id: 1, month: 'January', count: 126 },
    { id: 2, month: 'February', count: 536 },
    { id: 3, month: 'March', count: 245 },
    { id: 4, month: 'April', count: 345 },
    { id: 5, month: 'May', count: 643 },
    { id: 6, month: 'June', count: 123 },
    { id: 7, month: 'July', count: 643 },
    { id: 8, month: 'August', count: 864 },
    { id: 9, month: 'September', count: 245 },
    { id: 10, month: 'October', count: 543 },
    { id: 11, month: 'November', count: 864 },
    { id: 12, month: 'December', count: accessCount },
  ]);

 

  const [showAccessTable, setShowAccessTable] = useState(true);

  const handleAccessManagement = () => {
    const newAccessCount = accessCount + 1;
    setAccessCount(newAccessCount);

    // Lưu lượng truy cập theo từng tháng
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
    const updatedMonth = month.map((m) =>
      m.month === currentMonth ? { ...m, count: m.count + 1 } : m
    );
    setMonth(updatedMonth);

    localStorage.setItem('accessCount', newAccessCount.toString());
  };

  useEffect(() => {
    localStorage.setItem('accessCount', accessCount.toString());
  }, [accessCount]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <ul>
          <li className="mb-2">
            <button
              className={`text-white px-2 py-1 rounded ${showAccessTable ? 'bg-blue-500 hover:bg-blue-700' : ''}`}
              onClick={() => setShowAccessTable(true)}
            >
              Quản lý số lượng truy cập
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`text-white px-2 py-1 rounded ${!showAccessTable ? 'bg-blue-500 hover:bg-blue-700' : ''}`}
              onClick={() => setShowAccessTable(false)}
            >
              Quản lý tài khoản
            </button>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">{showAccessTable ? 'Access Management' : 'Account Management'}</h2>
        {showAccessTable ? (
          <>
            <p>Access Count: {accessCount}</p>
          
            {/* Table */}
            <table className="table-fixed w-full mt-4 mb-6">
              <thead>
                <tr>
                  <th className="w-1/2 px-4 py-2">Month</th>
                  <th className="w-1/2 px-4 py-2">Access Count</th>
                </tr>
              </thead>
              <tbody>
                {month.map(({ id, month, count }) => (
                  <tr key={id}>
                    <td className="border px-4 py-2">{month}</td>
                    <td className="border px-4 py-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          // Display account management content here
          <UserList users={users} />
        )}
      </div>
    </div>
  );
};

export default Admin;
