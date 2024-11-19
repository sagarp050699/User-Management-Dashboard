import React from "react";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No users available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserList;
