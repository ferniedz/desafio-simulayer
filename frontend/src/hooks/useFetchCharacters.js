import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

function useFetchCharacters() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCharacters = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/characters');
            setCharacters(res.data);
        } catch (err) {
            console.error("Error loading characters.", err);
            setError("Error loading characters.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchCharacters();
        }
        fetchData();
    }, [fetchCharacters]);

    return { characters, loading, error, refresh: fetchCharacters };
}

export default useFetchCharacters;