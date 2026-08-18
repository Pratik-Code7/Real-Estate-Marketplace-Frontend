import { useState, useEffect,react } from "react";
import axios from "axios";
import { Edit, Trash2, Check, X, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UsersSection() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

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

  const handleViewUser = async (userId) => {
    setSelectedUser(null);
    setDetailsError("");
    setDetailsLoading(true);

    try {
      const res = await axios.get(`http://localhost:3000/api/admin/users/${userId}`, {
        withCredentials: true,
      });
      setSelectedUser(res.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setDetailsError("Could not load this user's details.");
    } finally {
      setDetailsLoading(false);
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
                      <span className={`px-2 py-1 rounded-full text-xs ${user.role === "admin" ? "bg-purple-100 text-purple-700" :
                        user.role === "owner" ? "bg-blue-100 text-blue-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.isVerified ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}>
                        {user.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewUser(user._id)}
                          className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                          title="View details"
                        >
                          <Eye size={16} />
                          <span>View details</span>
                        </button>
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
                        {user.role !== "admin" && (
                          <button
                            onClick={() => setShowDeleteModal(user._id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(selectedUser || detailsLoading || detailsError) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">User Details</h3>
                <p className="text-sm text-gray-500">Profile and property information</p>
              </div>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setDetailsError("");
                }}
                className="rounded p-1 text-gray-500 hover:bg-gray-100"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {detailsLoading && <p className="py-10 text-center text-gray-500">Loading user details...</p>}
            {detailsError && <p className="py-10 text-center text-red-600">{detailsError}</p>}

            {selectedUser && (
              <>
                <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-2">
                  <DetailItem label="Name" value={selectedUser.user.name} />
                  <DetailItem label="Email" value={selectedUser.user.email} />
                  <DetailItem label="Phone" value={selectedUser.user.phone || "Not provided"} />
                  <DetailItem label="Role" value={selectedUser.user.role} />
                  <DetailItem label="Account status" value={selectedUser.user.isVerified ? "Verified" : "Pending"} />
                  <DetailItem label="Joined" value={new Date(selectedUser.user.createdAt).toLocaleDateString()} />
                  <DetailItem label="Sign-in method" value={selectedUser.user.provider} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatCard label="Total properties" value={selectedUser.stats.totalProperties} />
                  <StatCard label="Active listings" value={selectedUser.stats.activeListings} />
                  <StatCard label="Pending listings" value={selectedUser.stats.pendingListings} />
                  <StatCard label="Total views" value={selectedUser.stats.totalViews} />
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold">Properties</h4>
                  {selectedUser.properties.length === 0 ? (
                    <p className="mt-2 text-sm text-gray-500">This user has not posted any properties.</p>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {selectedUser.properties.map((property) => (
                        <button
                          key={property._id}
                          type="button"
                          onClick={() => navigate(`/property/${property._id}`)}
                          className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 text-left transition hover:border-gray-400 hover:bg-gray-50"
                          title="Open property details"
                        >
                          <div>
                            <p className="font-medium">{property.title}</p>
                            <p className="text-sm text-gray-500">{property.location} · {property.type} · {property.status}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">Rs {property.price}</p>
                            <p className="text-gray-500">{property.listingStatus}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
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

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm text-gray-900">{value}</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

export default UsersSection;
