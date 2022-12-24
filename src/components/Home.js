import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/userAuthContext";

import { db } from "../conexion.js";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { toast } from "react-toastify";
import Categorias from "./Categorias";

import RecordList from "./RecordList";
import { useEffect, useState } from "react";
import { useGeneral } from "../context/generalContext";

const Home = () => {
    const { user } = useUserAuth();
    const [date, setDate] = useState("");
    const { setEditingRecord, editingRecord, editRecord } = useGeneral();

    const saveRecord = async () => {
        if (!user) return toast.error("Debe iniciar sesión", { theme: "dark" });

        const monto = parseFloat(document.getElementById("monto").value);
        if (!monto || monto <= 0)
            return toast.error("Ingrese un monto valido", { theme: "dark" });

        const categoria = document.getElementById("categoria").value;
        const description = document.getElementById("description").value;
        const newRecordDate = new Date(document.getElementById("recordDate").value)

        try {

            if (editingRecord.state) {
                await editRecord("gastos", editingRecord.record.id, {
                    monto: monto,
                    description: description,
                    categoria: categoria,
                    date: newRecordDate,
                })
                setEditingRecord({ state: false, record: {} });
            }
            else {
                await addDoc(collection(db, "gastos"), {
                    persona: {
                        name: user.displayName,
                        email: user.email,
                    },
                    monto: monto,
                    description: description,
                    categoria: categoria,
                    date: serverTimestamp(),
                });
                document.getElementById("monto").value = "";
                toast.success("Registro guardado con exito", { theme: "dark" });
            }


        } catch (error) {
            toast.error(error.message, { theme: "dark" });
        }
    };

    const cancelEdit = () => {
        setEditingRecord({ state: false, record: {} });
    }

    useEffect(() => {
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        currentMonth =
            currentMonth.length === 2 ? currentMonth : "0" + currentMonth;
        setDate(`${currentDate.getFullYear()}-${currentMonth}`);
    }, []);

    const handleChange = (e) => {
        setDate(e.target.value);
    };

    if (editingRecord.state) {
        document.getElementById("monto").value = editingRecord.record.monto;
        document.getElementById("description").value = editingRecord.record.description;
        document.getElementById("categoria").value = editingRecord.record.categoria;
        document.getElementById("recordDate").value = editingRecord.record.date.toISOString().split('T')[0]
        console.log(editingRecord.record.date.toISOString().split('T')[0]);
    }

    return (
        <div className="container mt-3">
            <div className="card bg-dark" >
                <div className="card-header">
                    {
                        editingRecord.state ? (
                            <h5>Editar gasto</h5>
                        ) : (
                            <h5>Cargar gastos</h5>
                        )
                    }
                </div>

                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="monto">Monto</label>
                        <input
                            autoFocus
                            id="monto"
                            type="number"
                            placeholder="0,00"
                            className="amountField"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description">Descripción</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Ingrese una descripción (Opcional)"
                            className="w-100"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" className="form-select">
                            <Categorias />
                        </select>
                    </div>


                    <div className="mb-3" style={{ display: editingRecord.state ? 'block' : 'none' }}>
                        <label htmlFor="recordDate">Fecha de gasto</label>
                        <input
                            id="recordDate"
                            type="date"
                            placeholder="Ingrese la fecha del gasto"
                            className="w-100"
                        />
                    </div>

                </div>

                <div className="card-footer text-muted">
                    <Button onClick={saveRecord} variant="warning w-100">
                        {editingRecord.state ? 'EDITAR' : 'GUARDAR'}
                    </Button>

                    <Button onClick={cancelEdit} variant="danger" style={{ display: editingRecord.state ? 'block' : 'none' }}>
                        CANCELAR
                    </Button>
                </div>
            </div>

            <div className="card bg-dark mt-5">
                <div className="card-header">
                    <h5>Registros</h5>
                </div>

                <input
                    type="month"
                    id="date"
                    name="date"
                    defaultValue={date}
                    onChange={handleChange}
                    className="m-3 mb-1  p-2"
                />
                {date && <RecordList dateFilter={date} />}
            </div>
        </div>
    );
};

export default Home;
