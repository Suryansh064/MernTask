import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";

const AllTasks = () => {
    const [Data, setData] = useState();
    const [InputDiv, setInputDiv] = useState("hidden");
    const [updatedData, setUpdatedData] = useState({ id: "", title: "", desc: "" });

    const fetchTasks = async () => 
        {
        const headers = {
            id: localStorage.getItem("userId"),
            authorization: `Bearer ${localStorage.getItem("token")}`
        };
        try {
            const response = await axios.get(
                "http://localhost:5001/api/v2/getallTask",
                { headers }
            );
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center mb-4">
            <h1 className="text-6xl font-bold text-red-700  underline mb-4 text-center">All Tasks</h1>
            </div>
            <div className="w-full flex justify-end">
                <button onClick={() => setInputDiv("fixed")} className="cursor-pointer">
                    <IoIosAddCircleOutline className="hover:text-7xl text-6xl" />
                </button>
            </div>
            {Data && (
                <Cards
                    setInputDiv={setInputDiv}
                    home="true"
                    setData={setData}
                    setUpdatedData={setUpdatedData}
                    refreshTasks={fetchTasks}
                    data={Data.tasks}
                />
            )}
            <InputData
                InputDiv={InputDiv}
                setInputDiv={setInputDiv}
                updatedData={updatedData}
                refreshTasks={fetchTasks}
            />
        </div>
    );
};

export default AllTasks;
