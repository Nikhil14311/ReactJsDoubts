import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './img.jpg';
import Table from './Table';
import Languages from './Languages';
import Courosal from './Courosal';
import FallowMe from './FallowMe';
import {useTranslation} from "react-i18next";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const Home = (props) => {
  console.log("props",props.user)
  const {t} = useTranslation('dashboard');
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log("res",res);
    if(res){
      // navigate("/home")
      alert("Logged in Successfully")
    }
  
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
  };

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        alert("Logged out successfully")
    }).catch((error) => {
    // An error happened.
      console.log("error in signout",error);
    });
  }


  return (
    <div className='d-flex flex-column'>
      <div 
        style={{
          position:'relative',
          //backgroundImage:props.user.photoUrl
          backgroundImage:`url("https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGRldmVsb3BlcnxlbnwwfHwwfHw%3D&w=1000&q=80")`
        }}
      >
        <Container className='border-bottom'>
          <Row>
            <Col style={{display:'flex',alignItems:'center',justifyContent:'center',height:300}}>
              <img src={logo} style={{width:200,height:250,borderRadius:10}} alt="image" />
            </Col>
            <Col style={{display:'flex',alignItems:'center',justifyContent:'center',height:300}}>
              <div>
                <div>
                  <h2 style={{color:'#afeeee',textShadow:'inherit',fontFamily:'monospace',fontSize:22}}>{t('dashboard:fullstackdeveloper')}</h2>
                </div>
                <div>
                  <p style={{color:'white',borderWidth:1,borderColor:'white',fontSize:16}}>
                    {t('dashboard:passion')}
                  </p>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                {props.user ? 
                  <button 
                  style={{borderWidth:1,width:120,height:30,borderRadius:5,backgroundColor:'unset', borderColor:'tomato', color:'white', backgroundColor:'tomato', fontSize:12, fontFamily:'serif' }} 
                  onClick={()=>handleLogout()}
                  >
                    {t('dashboard:logout')}
                  </button>
                 :
                  <button 
                    style={{borderWidth:1,width:120,height:30,borderRadius:5,backgroundColor:'unset', borderColor:'tomato', color:'white', backgroundColor:'tomato', fontSize:12, fontFamily:'serif' }} 
                    onClick={signInWithGoogle}
                  >
                  Google
                  </button> }
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        <Table />
      </div>

      <div>
        <Languages />
      </div>

      <div style={{marginTop:20}}>
        <Courosal />
      </div>

      <div>
        <FallowMe />
      </div>
    </div>
  )
}

export default Home
