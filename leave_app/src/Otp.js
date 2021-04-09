
import './Otp.css'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Otp = () => {

    const [phno, setPhno] = useState("");
    const history = useHistory();


    async function register() {
        console.log(phno);
        let phonenumber = phno;
        let item = { phonenumber };

        const result = await fetch('http://localhost:1005/api/user/check', {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"

            }

        })
            .then((result) => sendOtp())
            .catch((error) => console.error(error));
        // console.log(result);


    }




    async function sendOtp() {
        console.log(phno);
        let channel = "sms";

        const result = await fetch(`http://localhost:4999/login/${phno}/${channel}`, {

            method: "GET",
            headers: {

                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((result) => result.json())
            .catch((error) => console.error(error));
        history.push(`/verification/${phno}`);
        console.log(result);



    }


    return (
        <div>
            <h1>Otp</h1>
            <div className="phno">
                <label className="label1">Enter Phonenumber</label><br></br>
                <input type="number" placeholder="Enter Phonenumber" name="phonenumber" className="phno"
                    onChange={(e) => {
                        console.log(e.target.value);
                        setPhno(e.target.value);
                    }} />
                <button onClick={register} className="btns">Get OTP</button>

            </div>
        </div>
    )
}

export default Otp;