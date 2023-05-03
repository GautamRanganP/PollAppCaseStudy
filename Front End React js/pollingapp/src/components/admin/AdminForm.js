import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminForm = () => {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [optionone,setOptionOne] = useState("");
    const [optiontwo,setOptionTwo] = useState("");
    const [startdateform, setStartDateForm] = useState(new Date());
    const [enddateform, setEndDateForm] = useState(new Date());
    // const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/');
            return
        }
        async function fetchData() {
            const response = await fetch(`http://localhost:8080/getpoll/${id}`);
            const responseData = await response.json();
            setStartDateForm(moment(responseData.startdate, 'DD/MM/YYYY').toDate());
            setEndDateForm(moment(responseData.enddate, 'DD/MM/YYYY').toDate());
            setTitle(responseData.title);
            setDescription(responseData.description);
            setOptionOne(responseData.optionone);
            setOptionTwo(responseData.optiontwo);
        }
        fetchData();
        // eslint-disable-next-line
    }, [])


    const handleCancel=()=>{
        navigate('/admin/home');
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (title === "" || description === "") {
            // setError("Please enter both email and password.");
            return;
        }

        let startdate = moment(startdateform).format('DD/MM/YYYY')
        let enddate = moment(enddateform).format('DD/MM/YYYY')
        const data = { title, description, startdate, enddate,optionone,optiontwo };
        const token = Cookies.get('token');
        fetch(`http://localhost:8080/updatepoll/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'x-access-token': token
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("update sucess", data)
                navigate('/admin/home')
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }


    return (
        <div className="wrap">
            <form onSubmit={handleUpdate} className="form-edit">
                <span style={{fontSize:"24px",fontWeight:"700",width:"100%",display:"inline-block",textAlign:"center"}}>Update Poll</span>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description"  value={description} onChange={(e) => setDescription(e.target.value)}  rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="optionone">option 1</label>
                    <input type="text" className="form-control" id="optionone" placeholder="optionone" value={optionone} onChange={(e) => setOptionOne(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="optiontwo">option 2</label>
                    <input type="text" className="form-control"  id="optiontwo" placeholder="optiontwo" value={optiontwo} onChange={(e) => setOptionTwo(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="startdate" className="form-label">Start Date</label>
                    <DatePicker
                        id="startdate"
                        dateFormat="dd/MM/yyyy"
                        showTimeSelect={false}
                        selected={startdateform}
                        onChange={(date) => {
                            setStartDateForm(date)
                        }
                        }
                        minDate={moment()._d}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="enddate" className="form-label">End Date</label>
                    <DatePicker
                         id="enddate"
                         dateFormat="dd/MM/yyyy"
                         showTimeSelect={false}
                         selected={enddateform}
                         onChange={(date) => {
                             setEndDateForm(date)
                         }
                         }
                         minDate={moment().add(1, 'days')._d}

                    />
                </div>
                <div className="button-form-wrap d-flex">
                    <button className="btn btn-primary btn-form" type="submit" style={{ marginRight: "20px", flex: 1 }}>Update</button>
                    <button className="btn btn-danger btn-form" type="button" onClick={handleCancel} style={{ flex: 1 }} >Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AdminForm;