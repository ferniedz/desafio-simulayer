import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

function useFetchScenes(page = 1, limit = 9) {     //1 e 9 sao parametros default, ou seja, se nao forem enviados parametros, sera utilizado 1 e 9
    const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMountedRef = useRef(true);

    const getScenes = useCallback(async () => {
        if (!isMountedRef.current) {
            return;
        }

        setLoading(true);

        try {
            const res = await api.get('/scenes', { params: { page, limit } });
            if (isMountedRef.current) {
                setScenes(res.data.scenes || res.data);
                setError(null);
            }
            
        } catch (err) {
            if (isMountedRef.current) {
                setError("Error loading scenes.", err);
            }

        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [page, limit]);

    useEffect(() => {
        isMountedRef.current = true;    //estava tendo problema de erro de chamada sincrona e tirei isso da IA, favor considerar
        
        const fetchData = async() => {
            getScenes();
        }
        
        fetchData();

        return () => {
            isMountedRef.current = false;
        };
    }, [getScenes]);

    return {
        scenes,
        loading,
        error,
        refresh: () => getScenes(true)
    };
}

export default useFetchScenes;










/* import { useState, useEffect, useCallback } from 'react';
 import api from "../services/api";

function useFetchScenes(id) {
    const [scene, setScene] = useState(null);
    const [loading, setLoading] = useState(true);

    const getScene = useCallback(async() => {
        try {
            const res = await api.get(`/scenes/${id}`);
            setScene(res.data);
        } catch (err) {
            console.log("Error finding scenes.", err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            getScene();
        }
    }, [id, getScene]);

    return {
        scene,
        loading,
        refresh: async() => {
            setLoading(true);
            await getScene();
        }
    };
}

export default useFetchScenes; */