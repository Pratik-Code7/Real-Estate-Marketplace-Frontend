import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Check, X, Eye } from "lucide-react";

function PropertiesSection() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [viewingProperty, setViewingProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/properties/recent?limit=50", { withCredentials: true });
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleEdit = (property) => {
    setEditingProperty(property._id);
    setEditFormData({
      title: property.title,
      type: property.type,
      status: property.status,
      location: property.location,
      price: property.price,
      listingStatus: property.status,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/properties/${editingProperty}`,
        editFormData,
        { withCredentials: true }
      );
      setEditingProperty(null);
      // Refresh properties
      const res = await axios.get("http://localhost:3000/api/admin/properties/recent?limit=50", { withCredentials: true });
      setProperties(res.data);
    } catch (err) {
      console.error("Error updating property:", err);
      alert("Failed to update property");
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/properties/${propertyId}`, { withCredentials: true });
      setShowDeleteModal(null);
      // Refresh properties
      const res = await axios.get("http://localhost:3000/api/admin/properties/recent?limit=50", { withCredentials: true });
      setProperties(res.data);
    } catch (err) {
      console.error("Error deleting property:", err);
      alert("Failed to delete property");
    }
  };

  const handleApprove = async (propertyId) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/properties/${propertyId}/approve`, {}, { withCredentials: true });
      // Refresh properties
      const res = await axios.get("http://localhost:3000/api/admin/properties/recent?limit=50", { withCredentials: true });
      setProperties(res.data);
    } catch (err) {
      console.error("Error approving property:", err);
      alert("Failed to approve property");
    }
  };

  const handleReject = async (propertyId) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/properties/${propertyId}/reject`, {}, { withCredentials: true });
      // Refresh properties
      const res = await axios.get("http://localhost:3000/api/admin/properties/recent?limit=50", { withCredentials: true });
      setProperties(res.data);
    } catch (err) {
      console.error("Error rejecting property:", err);
      alert("Failed to reject property");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold mb-4">All Properties</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2">Title</th>
              <th className="text-left py-3 px-2">Type</th>
              <th className="text-left py-3 px-2">Location</th>
              <th className="text-left py-3 px-2">Price</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-left py-3 px-2">Views</th>
              <th className="text-left py-3 px-2">Owner</th>
              <th className="text-left py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="border-b border-gray-100">
                {editingProperty === property._id ? (
                  <>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                        className="border rounded px-2 py-1 w-full max-w-xs"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={editFormData.type}
                        onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Office">Office</option>
                      </select>
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={editFormData.location}
                        onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={editFormData.price}
                        onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={editFormData.listingStatus}
                        onChange={(e) => setEditFormData({ ...editFormData, listingStatus: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3 px-2">-</td>
                    <td className="py-3 px-2">{property.postedBy?.name || 'Unknown'}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="p-1 hover:bg-green-100 rounded text-green-600"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingProperty(null)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-2 max-w-xs truncate">{property.title}</td>
                    <td className="py-3 px-2">{property.type}</td>
                    <td className="py-3 px-2">{property.location}</td>
                    <td className="py-3 px-2">{property.price}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : property.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">{property.views || 0}</td>
                    <td className="py-3 px-2">{property.postedBy?.name || 'Unknown'}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="p-1 hover:bg-blue-100 rounded text-blue-600"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        {property.status === "Pending" && (
                          <button
                            onClick={() => handleApprove(property._id)}
                            className="p-1 hover:bg-green-100 rounded text-green-600"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {property.status === "Verified" && (
                          <button
                            onClick={() => handleReject(property._id)}
                            className="p-1 hover:bg-orange-100 rounded text-orange-600"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => setShowDeleteModal(property._id)}
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
              Are you sure you want to delete this property? This action cannot be undone.
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

export default PropertiesSection;
