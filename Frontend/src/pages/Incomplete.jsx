import React, { useEffect } from "react";
import Cards from "../components/Home/Cards";
import useActions from "../hooks/useActions.jsx";

const Incomplete = () => {
    const {
    Data,
    fetchTasks,
    handleComplete,
    handleImportant,
    deleteTask,
    } = useActions("http://localhost:5001/api/v2/getInCompleteTask");

    useEffect(() => {
    fetchTasks();
    }, []);

    return (
        <div className="min-h-screen">
        <div className="flex justify-center items-center mb-4">
            <h1 className="text-6xl font-bold text-red-700  underline mb-4 text-center">InCompleted Tasks</h1>
        </div>
        <div >
            <Cards
                home={"false"}
                data={Data}
                handleImportant={handleImportant}
                handleComplete={handleComplete}
                deleteTask={deleteTask}
            />
        </div>
    </div>
    
);
};

export default Incomplete;

