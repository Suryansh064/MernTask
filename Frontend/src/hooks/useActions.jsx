import { useState } from "react";
import axios from "axios";

const useActions = (fetchUrl) => {
    const [Data, setData] = useState();

    const fetchTasks = async () => {
    const headers = {
        id: localStorage.getItem("userId"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
        const response = await axios.get(fetchUrl, { headers });
        setData(response.data.data);
    } catch (error) {
        console.log(error);
    }
    };

    const handleComplete = async (id) => {
    const headers = {
        id: localStorage.getItem("userId"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
        await axios.put(
        `http://localhost:5001/api/v2/updateCompleteTask/${id}`,
        {},
        { headers }
        );
        fetchTasks();
    } catch (error) {
        console.log(error);
    }
};

    const handleImportant = async (id) => {
    const headers = {
        id: localStorage.getItem("userId"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
        await axios.put(
        `http://localhost:5001/api/v2/updateImpTask/${id}`,
        {},
        { headers }
    );
    fetchTasks();
    } catch (error) {
    console.log(error);
    }
};

    const deleteTask = async (id) => {
    const headers = {
        id: localStorage.getItem("userId"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
        await axios.delete(
        `http://localhost:5001/api/v2/deleteTask/${id}`,
        { headers }
        );
        fetchTasks();
    } catch (error) {
        console.log(error);
    }
};

return { Data, setData, fetchTasks, handleComplete, handleImportant, deleteTask };
};

export default useActions;