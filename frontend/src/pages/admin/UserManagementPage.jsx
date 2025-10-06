// frontend/src/pages/admin/UserManagementPage.jsx
import React, { useState } from 'react';

// Dummy data for users
const initialUsers = [
  { id: 'u101', name: 'Alice Wonderland', email: 'alice@example.com', role: 'Customer', status: 'Active', joinDate: '2023-01-15' },
  { id: 'u102', name: 'Bob The Builder', email: 'bob@example.com', role: 'Customer', status: 'Active', joinDate: '2023-02-20' },
  { id: 'u103', name: 'Charlie Chaplin', email: 'charlie@example.com', role: 'Customer', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 'u104', name: 'Admin User', email: 'admin@movieapp.com', role: 'Admin', status: 'Active', joinDate: '2022-11-01' },
  { id: 'u105', name: 'David Copperfield', email: 'david@example.com', role: 'Customer', status: 'Active', joinDate: '2023-04-05' },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    // Implement actual save logic (API call to backend)
    const formData = new FormData(e.target);
    const updatedUser = {
      id: currentUser.id,
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      status: formData.get('status'),
      joinDate: currentUser.joinDate, // Keep original join date
    };

    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setShowModal(false);
    setCurrentUser(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-400">User Management</h1>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b-2 border-gray-700 bg-gray-700">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">User ID</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Join Date</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className={`hover:bg-gray-700 transition duration-200 ${user.status === 'Inactive' ? 'bg-gray-800/50 text-gray-500' : ''}`}>
                <td className="px-5 py-4 whitespace-nowrap text-sm">{user.id}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm flex items-center space-x-3">
                  <img src={`https://picsum.photos/seed/${user.name.toLowerCase()}/50/50`} alt={user.name} className="w-10 h-10 rounded-full object-cover"/>
                  <span>{user.name}</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 font-semibold rounded-full 
                    ${user.role === 'Admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`
                  }>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 font-semibold rounded-full 
                    ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`
                  }>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{user.joinDate}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-400 hover:text-blue-300 mr-2 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={user.role === 'Admin'} // Prevent editing admin for this example
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-400 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={user.role === 'Admin'} // Prevent deleting admin for this example
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="relative w-full max-w-xl bg-gray-800 rounded-lg shadow-xl p-8">
            <button
              onClick={() => { setShowModal(false); setCurrentUser(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Edit User: {currentUser?.name}</h2>

            <form onSubmit={handleSaveUser} className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">Name</label>
                <input
                  type="text" id="name" name="name" defaultValue={currentUser?.name}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">Email</label>
                <input
                  type="email" id="email" name="email" defaultValue={currentUser?.email}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400" readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="role">Role</label>
                <select id="role" name="role" defaultValue={currentUser?.role}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option>Customer</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="status">Status</label>
                <select id="status" name="status" defaultValue={currentUser?.status}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="text-right col-span-1">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 mr-3"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setCurrentUser(null); }}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;