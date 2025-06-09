
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
    } = useActions("https://merntask-3b8t.onrender.com/api/v2/getInCompleteTask");

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 px-2 sm:px-4 md:px-8">
            <div className="flex flex-col items-center justify-center my-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-red-700 underline mb-6 text-center">
                    InCompleted Tasks
                </h1>
            </div>
            <div className="w-full max-w-5xl mx-auto">
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
