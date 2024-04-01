import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env"
const rapidApiKey = RAPID_API_KEY;


export const useFetch = (endpoint, query) => {
    const [data, setDate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': "5114c5f3f4msh14ca9cacb15ee82p1773bejsn5bb1a8982d24",
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },

    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setDate(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert("There was an error fetching data")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, useFetch, error, refetch }
}