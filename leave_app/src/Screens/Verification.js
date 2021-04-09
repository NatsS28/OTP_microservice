


import { useState } from 'react';
import './Verification.css';
import { useHistory } from 'react-router-dom'

const Verification = () => {

    const history = useHistory();

    const [otp, setOtp] = useState("");
    let phone = window.location.pathname;
    var phno = phone.substring(phone.lastIndexOf('/') + 1);

    async function verify() {
        console.log(otp);
        console.log(phno);
        let code = otp;

        const result = await fetch(`http://localhost:4999/verify/${phno}/${code}`, {

            method: "GET",
            headers: {

                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((result) =>
                result.json())
            .catch((error) => console.error(error));
        if (result.status == "approved") {
            alert("Welcome");
            history.push('/homescreen');

        } else {
            history.push(`/verification/${phno}`);
        }

        // history.push('/verification');
        console.log(result);

    }

    return (
        <div>
            <h1>Otp</h1>
            <div className="phno">
                <label className="label2">Enter OTP</label><br></br>
                <input type="number" placeholder="Enter OTP" name="otp" className="otp"
                    onChange={(e) => {
                        setOtp(e.target.value);
                    }} />
                <button onClick={verify} className="btns1">Verify</button>

            </div>
        </div>
    )
}

export default Verification