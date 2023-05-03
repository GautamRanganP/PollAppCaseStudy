import { useNavigate } from 'react-router-dom';

const PollAdmin = (props) => {
    const { title, description ,_id ,votes,optiononevote,optiontwovote,startdate,enddate,optionone,optiontwo } = props.data;
    const navigate = useNavigate();

    const handlerNavigation=()=>{
        navigate(`/admin/edit/${_id}`)
    }

    const handleDelete =()=>{
        props.onEvent1(_id);
    }

    const handleResetVote =()=>{
        props.onEvent2(_id);
    }
    
    return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <div className="votes-wrap">
                        <span style={{ fontSize: "14px", color: "gray" }}>{optionone} : <span>{optiononevote}</span></span>
                        <span style={{ fontSize: "14px", color: "gray" }}>{optiontwo} : <span>{optiontwovote}</span></span>
                        <span style={{ fontSize: "14px", color: "gray" }}>Total Votes: <span>{votes}</span></span>
                        <span style={{ fontSize: "14px", color: "gray" }}>Start Date: <span>{startdate}</span></span>
                        <span style={{ fontSize: "14px", color: "gray" }}>End Date: <span>{enddate}</span></span>
                    </div>
                    <div className="btn-poll-wrap">
                        <button className="btn btn-primary" style={{flex:"1"}} type="button" onClick = {handlerNavigation}>Edit</button>
                        <button className="btn btn-danger" style={{flex:"1"}} type="button" onClick ={handleDelete}>Delete</button>
                        <button className="btn btn-success" style={{flex:"1"}} type="button" onClick ={handleResetVote}>Reset Vote</button>
                    </div>
                </div>
            </div>
    )
}

export default PollAdmin;