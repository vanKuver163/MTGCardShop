import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className="register">
        <section className="register_section">
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button className="register_button" onClick={goBack}>Go Back</button>
            </div>
        </section>
        </div>
    )
}

export default Unauthorized