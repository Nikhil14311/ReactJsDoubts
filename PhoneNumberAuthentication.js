import React, {useState} from 'react'
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const PhoneNumberAuthentication = () => {

  const navigate = useNavigate();

  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');

  const signin = () => {
  
    if (mynumber === "" || mynumber.length < 10) return;

    window.reCaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        console.log("response",response);
      },
      'error-callback': function(error) {
        console.log('Error', error);
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    }, auth);
    signInWithPhoneNumber(auth,mynumber,window.reCaptchaVerifier).then((result) => {
        setfinal(result);
        alert("code sent")
        setshow(true);
      })
        .catch((err) => {
            //alert(err);
            console.log("error in signinwithphonenumber",err);
            //window.location.reload()
        });

        
}

// Validate OTP
const ValidateOtp = () => {
    if (otp === null || final === null)
        return;
    final.confirm(otp).then((result) => {
        // success
        console.log("result after otp",result);
        navigate('/')
    }).catch((err) => {
        alert("Wrong code");
    })
}


  return (
    <div className='container' style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
      <div style={{ "marginTop": "200px" }}>
            <center>
                <div style={{ display: !show ? "block" : "none" }}>
                    <input value={mynumber} onChange={(e) => { 
                       setnumber(e.target.value) }}
                        placeholder="Phone number" />
                    <br /><br />
                    <div id="recaptcha-container"></div>
                    <button onClick={signin}>Send OTP</button>
                </div>
                <div style={{ display: show ? "block" : "none" }}>
                    <input type="text" placeholder={"Enter your OTP"}
                        onChange={(e) => { setotp(e.target.value) }}></input>
                    <br /><br />
                    <button onClick={ValidateOtp}>Verify</button>
                </div>
            </center>
        </div>
    </div>
  )
}

export default PhoneNumberAuthentication
