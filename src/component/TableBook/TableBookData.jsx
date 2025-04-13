import React, { useState, useEffect } from 'react';
import axios from "axios"

const TableBookData = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [input, setInput] = useState('');
  const [entry, setEntry] = useState(null);

  const fetchEntry = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/address-book/${input}`);
      setEntry(res.data);
      console.log("Fetched Entry:", res.data);
    } catch (err) {
      console.error("Error fetching entry:", err);
      setEntry(null);
    }
  };

  const reset = () => {
    setInput("")
    setEntry(null);
  }

  console.log("Data wiil be", data)

  // fetch all data 
  const fetchAllData = async () => {
    let dataGet = await axios.get("http://localhost:3000/address-book");
    setData(dataGet.data)
    console.log(333, dataGet.data)
  }

  useEffect(() => {
    fetchAllData()
  }, []);

  // Edit functionlity

  const handleEdit = async (id) => {
    try {
      const editResponse = await axios.get(`http://localhost:3000/address-book/${id}`)
      setEditItem(editResponse.data);
      setModal(true)
    } catch (error) {
      console.error("❌ Failed to fetch entry:", error);
    }
  }
  console.log("Edit data ", editItem)


  // Delete functionlity
  const handleDelete = async (id) => {
    let confirmDelete = confirm("Are you sure you want to delete this data?");
    if (!confirmDelete) { return }
    const deletData = await axios.delete(`http://localhost:3000/address-book/${id}`);
    await fetchAllData()
  };


  // Modal Functionality 
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const handleSave = async () => {

    try {
      await axios.patch(`http://localhost:3000/address-book/${editItem.id}`, {
        name: editItem.name,
        phone: editItem.phone,
        address: editItem.address,
      })

      await fetchAllData();
      setModal(false);
      setEditItem(null);
      alert("✅ Record updated successfully!");
    }
    catch (error) {
      console.error("❌ Failed to update record:", error);
      alert("Failed to update record.");
    }

  };

  return (
    <>

      <div className="max-w-md mx-auto mt-3 p-2 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Search by ID or Email</h2>
        <input
          type="text"
          placeholder="Enter ID or Email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-3 py-1 w-full mb-3 rounded"
        />
        <button
          onClick={fetchEntry}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 "
        >
          Fetch Entry
        </button>
        <button
          onClick={reset}
          className=" mx-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Reset
        </button>

        {entry ? (<div className="mt-3 border-t pt-2">
          <p><strong>Name:</strong> {entry.name}</p>
          <p><strong>Email:</strong> {entry.email}</p>
          <p><strong>Phone:</strong> {entry.phone}</p>
          <p><strong>Address:</strong> {entry.address}</p>
        </div>) : (<div className="mt-2 border-t pt-2 text-center"><p>No data avaliable</p></div>)}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">

        <div className="hidden md:block">
          <div className="shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full border-collapse text-sm text-left text-gray-700 bg-white">
              <thead className="bg-gray-100 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr className="border-t">
                    <td colSpan="5" className="text-center px-6 py-4 text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4">{item.address}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        </div>


        <div className="md:hidden space-y-4">
          {data.length === 0 ? (<p className="text-center text-red-500">No data available</p>) :
            (data.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 space-y-2">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Phone:</strong> {item.phone}</p>
                <p><strong>Address:</strong> {item.address}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                    onClick={() => handleDelete(item.email)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
            )
          }

        </div>
      </div>


      {modal && editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg space-y-3">
            <h2 className="text-xl font-semibold mb-2">Edit Record</h2>
            <input
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleModalChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editItem.email}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
            />
            <input
              type="text"
              name="phone"
              value={editItem.phone}
              minLength={0}
              maxLength={10}
              onChange={handleModalChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Phone"
            />
            <input
              type="text"
              name="address"
              value={editItem.address}
              onChange={handleModalChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Address"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded"
                onClick={() => {
                  setModal(false);
                  setEditItem(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableBookData;
