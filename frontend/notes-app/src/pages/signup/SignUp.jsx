import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import { Link,useNavigate} from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const SignUp = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignUp = async (e)=>{
    e.preventDefault()
    if(!name){
      setError("Please Enter Your Name")
      return;
    }
    if(!validateEmail(email)){
      setError("please enter a valid email")
      return;
    }
    if(!password){
      setError("please enter a valid password")
      return;
    }
    setError('')

    // signup api call
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password
      })

      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }
      else {
        setError("An unexpected credentials occured,please try again")
      }

    }


  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-10 py-16">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl text-black font-bold mb-7">SignUP</h4>

            <input type="text" placeholder="Name" className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input type="text" placeholder="Email" className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1 ">{error}</p>}

            <button type="submit" className="btn-primary">
              SignUp
            </button>
            <p className="text-sm mt-6 text-center">
              Already have an Account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>

  )
}

export default SignUp