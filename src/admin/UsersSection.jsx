import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Check, X } from "lucide-react";

function UsersSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/users", { withCredentials: true });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      phone: user.phone || "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/users/${editingUser}`,
        editFormData,
        { withCredentials: true }
      );
      setEditingUser(null);
      // Refresh users
      const res = await axios.get("http://localhost:3000/api/admin/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, { withCredentials: true });
      setShowDeleteModal(null);
      // Refresh users
      const res = await axios.get("http://localhost:3000/api/admin/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const handleVerify = async (userId) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/users/${userId}/verify`, {}, { withCredentials: true });
      // Refresh users
      const res = await axios.get("http://localhost:3000/api/admin/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error("Error verifying user:", err);
      alert("Failed to verify user");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold mb-4">All Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Role</th>
              <th className="text-left py-3 px-2">Joined</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-left py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-100">
                {editingUser === user._id ? (
                  <>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={editFormData.role}
                        onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        <option value="tenant">Tenant</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <select
                        value={editFormData.isVerified.toString()}
                        onChange={(e) => setEditFormData({ ...editFormData, isVerified: e.target.value === "true" })}
                        className="border rounded px-2 py-1"
                      >
                        <option value="true">Verified</option>
                        <option value="false">Pending</option>
                      </select>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="p-1 hover:bg-green-100 rounded text-green-600"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-2">{user.name}</td>
                    <td className="py-3 px-2">{user.email}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin" ? "bg-purple-100 text-purple-700" :
                        user.role === "owner" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isVerified ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {user.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-1 hover:bg-blue-100 rounded text-blue-600"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        {!user.isVerified && (
                          <button
                            onClick={() => handleVerify(user._id)}
                            className="p-1 hover:bg-green-100 rounded text-green-600"
                            title="Verify"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => setShowDeleteModal(user._id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone and will also delete all their properties.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersSection;
