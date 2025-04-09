import React, { useState, useEffect } from 'react';

const TableBookData = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("book")) || [];
    setData(storedData);
  }, []);

  //   let myStyle = {
  //     color: props.mode ==='dark'?'white':'#042743',
  //     backgroundColor: props.mode ==='dark'?'rgb(36 74 104)':'white', 
  // }

  // Edit functionlity

  const handleEdit = (id) => {
    const updateEditData = data.find((curElem) => curElem.email === id);
    setEditItem(updateEditData);
    setModal(true);
  };

  // Delete functionlity
  const handleDelete = (email) => {
    let confirmDelete=confirm("Are you sure you want to delete this data?");
    if(!confirmDelete){return}
    const updatedData = data.filter((item) => item.email !== email);
    setData(updatedData);
    localStorage.setItem("book", JSON.stringify(updatedData));
  };


  // Modal Functionality 
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const handleSave = () => {
    const updatedList = data.map((item) =>
      item.email === editItem.email ? editItem : item
    );
    setData(updatedList);
    localStorage.setItem("book", JSON.stringify(updatedList));
    setModal(false);
    setEditItem(null);
  };

  return (
    <>
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
                          onClick={() => handleEdit(item.email)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(item.email)}
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
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 space-y-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Address:</strong> {item.address}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                  onClick={() => handleEdit(item.email)}
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
          ))}
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
