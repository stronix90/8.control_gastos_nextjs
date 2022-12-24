import { useGeneral } from "../context/generalContext";

const Records = ({ record, openModal}) => {
    const { delRecord, setEditingRecord } = useGeneral();

    const daysName = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

    const iniciales = record.persona.name
        .split(" ")
        .map((palabra) => {
            return palabra[0];
        })
        .join("");


    const delEntry = async () => {
        delRecord("gastos", record.id)
    };

    const editEntry = () => {
        setEditingRecord({ state: true, record: record });
    };

    return (
        <div className='row'>
            <div className='col-auto my-auto'>
                <div className='mainAvatar'>{iniciales}</div>
                <div className='secondAvatar'>{record.icon}</div>
            </div>
            <div className='col my-auto px-0'>
                <p>
                    {record.description
                        ? `${record.description}`
                        : record.categoria}
                </p>

                <p className='text_secondary'>
                    {record.description
                        ? daysName[new Date(record.date).getDay()] +
                        " " +
                        new Date(record.date).getDate() +
                        " | " +
                        record.categoria
                        : daysName[new Date(record.date).getDay()] +
                        " " +
                        new Date(record.date).getDate()}
                </p>
            </div>
            <div className='col-auto my-auto ms-auto'>
                <i
                    style={{ cursor: "pointer" }}
                    className='fa fa-trash'
                    aria-hidden='true'
                    onClick={delEntry}
                ></i>
                <i
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    className='fa fa-edit'
                    aria-hidden='true'
                    onClick={editEntry}
                ></i>
            </div>
            <div className='col-auto my-auto text_amount'>${record.monto}</div>
        </div>
    );
};

export default Records;
