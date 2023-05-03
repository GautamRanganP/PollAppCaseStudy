
import { useEffect, useState } from "react"
import PollAdmin from "../components/card/PollAdmin";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
// import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        const token = Cookies.get('token');
        fetch(`http://localhost:8080/deletepoll/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'x-access-token': token
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((response) => {
                // navigate('/admin/home')
            })
            .catch((error) => {
                console.error("Error:", error);
                // setError("Something went wrong");
            });

    }
    const handleReset = (id) => {
        const token = Cookies.get('token');
        fetch(`http://localhost:8080/reset/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'x-access-token': token
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                navigate('/admin/home')
            })
            .catch((error) => {
                console.error("Error:", error);
                // setError("Something went wrong");
            });
    }

    const handlerLogout = () => {
        Cookies.remove('token');
        const token = Cookies.get('token');
        if (!token) {
            navigate('/');
            return
        }
    }
    const handleRoute = () => {
        navigate('/admin/create')
    }

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/');
            return
        }
        const newSocket = new WebSocket("ws://localhost:8081/");

        newSocket.addEventListener("open", (event) => {
            console.log("connection opened")
            let json = JSON.stringify({ update: false })
            console.log("sent from client ", json);
            newSocket.send(json);

        });
        newSocket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
            const response = JSON.parse(event.data)
            setData(response);

        });
        newSocket.addEventListener("close", (event) => {
            console.log("connection close")
        });
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <div style={{ position: "absolute", right: "10px", top: "8px" }}>
                <button className="btn btn-primary" onClick={handlerLogout}> Logout</button>
            </div>
            <div className="content-poll">
                <div className="d-flex justify-content-center mb-4">
                    {/* <button className="btn btn-primary d-flex align-items-center" style={{fontWeight:"700"}} onClick={handleRoute}><AddBoxIcon sx={{marginRight:"5px"}}/> Create Poll</button> */}
                    <button className="btn btn-primary" onClick={handleRoute}>Create Poll</button>
                </div>
                {data.length > 0 ?
                    <div className="row poll-card-margin">
                        {data.map((poll, index) => {
                            return (
                                <div className="col-sm-6 mb-4" key={index}>
                                    <PollAdmin data={poll} onEvent1={handleDelete} onEvent2={handleReset}></PollAdmin>
                                </div>
                            )
                        })}

                    </div>
                    :
                    <div style={{fontSize:"24px",fontWeight:"700",textAlign:"center",marginTop:'40px'}}>No poll Available</div>
                }
            </div>
        </div>
    )


}