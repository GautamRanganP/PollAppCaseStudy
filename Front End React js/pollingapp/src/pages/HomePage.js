import { useEffect, useState } from "react"
import PollCard from "../components/card/PollCard";

export function HomePage() {
    const [data, setData] = useState([]);

    const handleOptionOne = (id, count, total) => {
        const newSocket = new WebSocket("ws://localhost:8081/");
        let serverdata = {};
        newSocket.addEventListener("open", (event) => {
            let json = JSON.stringify({ id: id, countoptionone: count, totalvote: total, update: true })
            console.log("sent", json)
            newSocket.send(json);
        });
        newSocket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
            serverdata = JSON.parse(event.data)
            setData(serverdata);
        });
        console.log("option one")
    }

    const handleOptionTwo = (id, count, total) => {
        const newSocket = new WebSocket("ws://localhost:8081/");
        let serverdata = {};
        newSocket.addEventListener("open", (event) => {
            let json = JSON.stringify({ id: id, countoptiontwo: count, totalvote: total, update: true })
            console.log("sent from client ", json);
            newSocket.send(json);
        });
        newSocket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
            serverdata = JSON.parse(event.data)
            setData(serverdata);

        });
        console.log("option two")

    }




    useEffect(() => {
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
        // return () => {
        //     console.log("connection close")
        //   newSocket.close();
        // };
    }, []);



    return (
        <div className="content-poll">
            {/* <nav className="navbar" style={{ backgroundColor: "#e3f2fd", marginBottom: "10px" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <span className="bi bi-unity"></span>
                        Poll App
                    </a>
                </div>
            </nav> */}
            {data.length > 0 ?
                <div className="row poll-card-margin" style={{ margin: "10px" }}>
                    {
                        data.map((poll, index) => {
                            return (
                                <div className="col-sm-6 mb-4" key={index}>
                                    <PollCard data={poll} isPollSelect={{ isPollSelect: false }} onEvent1={handleOptionOne} onEvent2={handleOptionTwo}></PollCard>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <div style={{fontSize:"24px",fontWeight:"700",textAlign:"center",marginTop:'40px'}}>No poll Available</div>
            }
        </div>
    )

}