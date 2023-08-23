import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const useGetData = (collectionName) => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const collectionRef = collection(db, collectionName);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const getData = async () => {
      try {
        onSnapshot(collectionRef, (snapShot) => {
          const data = snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setData(data);
          setLoading(false);
          setError(false);
        });
      } catch (err) {
        setError("Error while fetching products from DB");
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export default useGetData;
