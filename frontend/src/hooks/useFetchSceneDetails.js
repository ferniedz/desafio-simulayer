import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

function useFetchSceneDetails(id) {
    const [scene, setScene] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMountedRef = useRef(true);

    const getDetails = useCallback(async () => {
        if (!id) {
            return;
        }
        if (isMountedRef.current) {
            setLoading(true)
        }
        try {
            const res = await api.get(`/scenes/${id}`);
            if (isMountedRef.current) {
                setScene(res.data);
            }
        } catch (err) {
            console.error("Error loading scene details.", err);
            setError("Error loading scene details.");
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [id]);

    useEffect(() => {
        isMountedRef.current = true;

        const fetchData = async () => {
            await getDetails();
        }

        fetchData();

        return () => {
            isMountedRef.current = false;
        }
    }, [getDetails]);

    return { scene, loading, error, refresh: getDetails };
}

export default useFetchSceneDetails;