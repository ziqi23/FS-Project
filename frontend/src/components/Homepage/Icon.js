import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/Notion_app_logo.png"
import { Navigate } from "react-router-dom";

const Icon = (props) => {
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate('/')   
    }
    return (
        <>
            <button onClick={(handleClick)}>
                <img src={logo}></img>
            </button>
        </>
    )
}

export default Icon