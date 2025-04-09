import React, { useState } from 'react';

const Data = () => {

    const [bookData, setBookData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })



    const handleChanged = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const existingdata = JSON.parse(localStorage.getItem("book", bookData)) || [];
        const updated = [...existingdata, bookData];
        localStorage.setItem("book", JSON.stringify(updated))
        setBookData({
            name: "",
            email: "",
            phone: "",
            address: ""
        })

        // Duplicate email functionlaity its optional functionlaity
        // const isDuplicate = existingdata.some(
        //     (item) => item.email === bookData.email && item.name === bookData.name
        //   );
        
        //   if (isDuplicate) {
        //     alert("This name and email are already registered!");
        //     return; 
        //   }

        alert("Data submitted suceesfully")
        console.log(111, bookData)
    }
    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-2xl mt-8" >
            <h2 className={`text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center`}>
                User Information
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={bookData.name}
                        onChange={handleChanged}
                        name="name"
                        required
                        placeholder="Enter Your Name "
                        className="w-full p-3 text-sm border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={bookData.email}
                        onChange={handleChanged}
                        name="email"
                        required
                        className="w-full p-3 text-sm border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" >
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={bookData.phone}
                        onChange={handleChanged}
                        required
                        placeholder="e.g. 123-456-7890"
                        className="w-full p-3 text-sm border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" >
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={bookData.address}
                        onChange={handleChanged}
                        required
                        className="w-full p-3 text-sm border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>


                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Data;
