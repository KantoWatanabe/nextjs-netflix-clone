import { useState, useCallback } from "react";
import { AxiosResponse } from 'axios';
import axios from "@/lib/axios";

type Method = 'GET' | 'POST';

type ErrorResponse = {
  message: string;
};

export const useCommunicate = <T, U>(url: string, method: Method, request?: U):[
  { error: ErrorResponse | null, loading: boolean},
  { communicate: (request?: U) => Promise<AxiosResponse<any, any> | null>; }
] => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const communicate = useCallback(async (request?: U): Promise<AxiosResponse<any, any> | null> => {
    setLoading(true);
    let response = null;
    try {
      response = method === 'GET' ? await axios.get(url) : await axios.post(url);
    } catch (e) {
      if (e instanceof Error) {
        setError({message: e.message});
      }
    } finally {
      setLoading(false);
      return response;
    }
  }, [url, method]);
    
  return [{error, loading}, {communicate}];
};
