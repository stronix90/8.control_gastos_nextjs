import { createContext, useContext, useState } from "react";
import { db } from "../conexion";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const contexto = createContext();
const { Provider } = contexto;

export const useGeneral = () => {
    return useContext(contexto);
};

const GeneralProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const [editingRecord, setEditingRecord] = useState({state: false, record: {}});

    const postRecords = (records) => {
        setRecords(records);
    };

    const editRecord  = async (collection, id, updateDocument) => {
        const documentRef = doc(db, collection, id);
        await updateDoc(documentRef, updateDocument);
    }

    const delRecord = async (collection, id) => {
        let del = false;
        if (window.confirm("Se borrará el registro. ¿Está seguro?")) del = true;

        if (del) {
            await deleteDoc(doc(db, collection, id));
            toast.success("Registro borrado con exito", { theme: "dark" });
        }
    };

    const contextValues = {
        records,
        postRecords,
        editRecord,
        delRecord,
        setEditingRecord,
        editingRecord
    };

    return <Provider value={contextValues}>{children}</Provider>;
};

export default GeneralProvider;
