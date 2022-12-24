import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../conexion";
import Records from "./Records";
import { useGeneral } from "../context/generalContext";
import JSONToCSVConvertor from "../aux/convJSONtoCSV";
import { Button } from "react-bootstrap";


const RecordList = ({ dateFilter }) => {
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const { records, postRecords } = useGeneral();

    const formatearYSetear = (arrayDeDocumentos) => {
        return arrayDeDocumentos.map((documento) => {
            return { ...documento.data(), id: documento.id };
        });
    };

    const calcTotal = (registros) => {
        const total = registros.reduce(
            (previous, current) => previous + current.monto,
            0
        );
        setTotal(total);
    };

    const getRecords = async (categorias) => {
        const gastosCollection = collection(db, "gastos");
        const [y, m] = dateFilter.split("-");
        const date1 = new Date(y, m - 1, 1);
        const date2 = new Date(y, m, 1);

        const w2 = where("date", ">=", date1);
        const w3 = where("date", "<=", date2);
        const q = query(gastosCollection, w2, w3, orderBy("date", "desc"));

        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
            const result = formatearYSetear(querySnapshot.docs);
            let records = addIconToCategorie(result, categorias || categories);

            records.map((record) => {
                record.date = record.date.toDate();
            });
            postRecords(records);
            calcTotal(records);
            setLoading(false);
        });
    };

    const addIconToCategorie = (records, categorias) => {
        return records.map((record) => {
            const catIcon = categorias.find(
                (categorie) => categorie.categoria === record.categoria
            );
            return { ...record, icon: catIcon?.icon || "" };
        });
    };

    useEffect(() => {
        if (categories.length === 0) {
            const categoriasCollection = collection(db, "categorias");
            const categoriasQuery = query(categoriasCollection);
            getDocs(categoriasQuery).then((querySnapshot) => {
                const result = formatearYSetear(querySnapshot.docs);
                setCategories(result);
                getRecords(result);
            });
        } else getRecords();

        // return () => {
        //     unsubscribe();
        // };
    }, [dateFilter]);

    const handleDownloadExcel = () => {

        records.map(record => {
            record.date = record.date.toLocaleDateString();
            record.persona = record.persona.name
        })

        console.log(records)
        JSONToCSVConvertor(records, "Control Gastos", true);
    }

    return (
        <>
            <div className='card records'>
                {loading ? (
                    <p>Cargando</p>
                ) : (
                    <>
                        {records.map((record, index) => (
                            <Records key={index} record={record} />
                        ))}
                        <Button variant="warning" onClick={handleDownloadExcel}><img
                            width={28}
                            src='https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg'
                            alt=''
                        />Descargar</Button>

                        <div className='total'>
                            <p>Gasto total: ${total}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default RecordList;
