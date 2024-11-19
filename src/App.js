import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "./api/api";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleAdd = async (user) => {
    const newUser = await addUser(user);
    setUsers((prev) => [...prev, newUser]);
    setShowForm(false);
  };

  const handleEdit = async (user) => {
    const updatedUser = await updateUser(user);
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="app-container">
      <h1>User Management Dashboard</h1>
      <button className="add-user-btn" onClick={() => setShowForm(true)}>
        Add User
      </button>
      {showForm && (
        <UserForm
          onSubmit={selectedUser ? handleEdit : handleAdd}
          onClose={() => setShowForm(false)}
          user={selectedUser}
        />
      )}
      <UserList
        users={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
