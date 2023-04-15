import React, { useState } from 'react'
import {db} from './firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const ContactUs = () => {

  const navigate = useNavigate();

  const[data,setData] = useState({
    firstname : '',
    lastname : '',
    email : '',
    mobilenumber : '',
    comment : ''
  })

  const {firstname, lastname, email, mobilenumber, comment} = data;

  const sendUserRequest = async(e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Requests"), {
        firstname : firstname,
        lastname : lastname,
        email : email,
        mobilenumber : mobilenumber,
        comment : comment
      });
      console.log("Document written with ID: ", docRef.id);
      navigate('/')
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const changeHandler = (e) => {
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value})
  }

  return (
    <div className='container' style={{width:'50%'}}>
      <form>
        <div class="row mt-2">
          <div class="col">
            <input type="text" class="form-control" name="firstname" value={firstname} placeholder="First name" onChange={(e)=>changeHandler(e)} />
          </div>
          <div class="col">
            <input type="text" class="form-control" name='lastname' value={lastname} placeholder="Last name" onChange={(e)=>changeHandler(e)} />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <input type="email" class="form-control" name='email' value={email} placeholder="Email" onChange={(e)=>changeHandler(e)} />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <input type="number" class="form-control" name='mobilenumber' value={mobilenumber} placeholder="Mobile Number" onChange={(e)=>changeHandler(e)} />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <textarea type="text" class="form-control" name='comment' value={comment} placeholder="Enter Your Comment" onChange={(e)=>changeHandler(e)} />
          </div>
        </div>
        <div className='text-center mt-2'>
          <button type="submit" class="btn btn-primary" onClick={(e)=>sendUserRequest(e)}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ContactUs
