import moment from 'moment';
import { useEffect, useState } from 'react';
import ProgressBar from '../progess/ProgressBar';


const PollCard = (props) => {
    const [percentone, setPercentOne] = useState(0);
    const [percenttwo, setPercentTwo] = useState(0);
    const [ispollalreadyselected, setIsPollAlreadySelected] = useState(false);
    const [daysleft, setDaysLeft] = useState('');
    const { _id, title, description, optionone, optiontwo, votes, optiononevote, optiontwovote, startdate, enddate } = props.data;


    useEffect(() => {
        if (votes !== 0) {
            let percent = (optiononevote) / (votes) * 100;
            percent = Math.round(percent);
            setPercentOne(percent);
        }
        else {
            setPercentOne(0);
        }
    }, [optiononevote, votes])

    useEffect(() => {
        if (votes !== 0) {
            let percent = (optiontwovote / votes) * 100;
            percent = Math.round(percent)
            setPercentTwo(percent)
        }
        else {
            setPercentTwo(0);
        }
    }, [optiontwovote, votes])

    useEffect(() => {
        let today = moment().format("DD/MM/YYYY")
        let startingdate = '';

        if(moment(startdate).isAfter(today))
            startingdate = startdate;
        else
            startingdate = today;

        var a = moment(enddate, "DD/MM/YYYY");
        var b = moment(startingdate, "DD/MM/YYYY");
        let daysAvailable = a.diff(b, 'days')
        setDaysLeft(daysAvailable)
        console.log("date left:", daysAvailable);
        // eslint-disable-next-line 
    }, [startdate,enddate])

    const handlerOptionOne = (e) => {
        let count = optiononevote;
        count++;
        props.onEvent1(_id, count, votes)
        setIsPollAlreadySelected(true)
    }

    const handlerOptionTwo = () => {
        let count = optiontwovote;
        count++;
        props.onEvent2(_id, count, votes);
        setIsPollAlreadySelected(true)
    }

    return (
        <div className="card" style={{ border: "5px solid rgb(227, 242, 253)" }}>
            {/* , boxShadow: "5px 5px 10px rgb(227, 242, 253)" */}
            <div className="card-body" style={{position:'relative'}}>
                {ispollalreadyselected && daysleft >= 1 ?
                    <div className=''>
                        <h5 className="card-title" style={{flex:"1"}}>{title}</h5>
                        <span style={{backgroundColor:'green',padding:'8px',borderRadius:'5px',color:"white",fontWeight:"700",position:'absolute',left:'20px',bottom:'10px'}}>Already voted</span>
                    </div>
                    :
                    <h5 className="card-title">{title}</h5>
                }
                <p className="card-text">{description}</p>
                {!ispollalreadyselected && daysleft >= 1 ? (
                    <div className="d-flex gap-4">
                        <button className="btn btn-primary " style={{ flex: "1", fontWeight: "700" }} value={optionone} type="button" onClick={handlerOptionOne}>{optionone}</button>
                        <button className="btn btn-primary" style={{ flex: "1", fontWeight: "700" }} value={optiontwo} type="button" onClick={handlerOptionTwo}>{optiontwo}</button>
                    </div>
                ) :
                    <div>
                        <ProgressBar data={percentone}></ProgressBar>
                        <ProgressBar data={percenttwo}></ProgressBar>
                    </div>}
                <div className="votes-wrap d-flex justify-content-end">
                    <span style={{ fontSize: "14px", color: "gray", margin: "10px", marginBottom: "0px" }}>Total votes: <span>{votes}</span></span>
                    {daysleft >= 1 ? (
                        <span style={{ fontSize: "14px", color: "gray", margin: "10px", marginBottom: "0px" }}>
                            Days left: <span>{daysleft}</span>
                        </span>
                    ) : (
                        <span style={{ fontSize: "14px", color: "gray", margin: "10px", marginBottom: "0px" }}>Poll expired</span>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default PollCard;