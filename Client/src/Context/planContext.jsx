import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const PContext = createContext();

const PlanContext = ({ children }) => {
    const [plan, setplan] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
      if(!token){
       return <>
        { children }
        </>
      }
        const fetchAllPlans = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/plan/allplans`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setplan(response.data.plan);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };

        if (token) {
            fetchAllPlans();
        }
    }, [token]);
    return (
        <PContext.Provider value={{ plan, setplan }}>
            {children}
        </PContext.Provider>
    );
};

export default PlanContext;