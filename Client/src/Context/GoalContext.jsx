import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const Goalcontext = createContext();

const GoalContext = ({ children }) => {
    const [goal, setGoal] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return; 
        
        const fetchAllGoals = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/goal/allGoals`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    setGoal(response.data.goals);
                }
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };

        fetchAllGoals();
    }, [token]); 

    return (
        <Goalcontext.Provider value={{ goal, setGoal }}>
            {children}
        </Goalcontext.Provider>
    );
};

export default GoalContext;
