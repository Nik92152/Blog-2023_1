import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {status} = useSelector((state) => state.auth) 
  const dispatch = useDispatch()

  useEffect(() => {
    if (status) {
        toast(status)
    }
  }, [status])
  
  const handleSubmit =() => {
    try {
      dispatch(registerUser({username, password}))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form 
    onSubmit ={ e => e.preventDefault()}
    className='w-1/4 h-60 mx-auto mt-+30 text-white' 
    >
      <h1 className='="text-lg text-white text-center'> Регистрация</h1>
      <label className='text=xs text-white-400'>
        Username:
        <input type='text'
        value= {username}
        onChange={(e)=>setUsername(e.target.value)}
        placeholder='Username'
        className='mt-1 w-full items-center rounded-lg bg-gray-400 border py-1 px-4 text-xs outline-none placeholder:text-gray-700'/>
      </label>
  
      <label className='text=xs text-white-400'>
        Password:
        <input type='pasword'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Password'
        className='mt-1 text-white w-full items-center rounded-lg bg-gray-400 border py-1 px-4 text-xs outline-none placeholder:text-gray-700'/>
      </label>
      <div className="flex justify-between mt-4">
        <button 
            type ="submit"
            onClick={handleSubmit}
            className='flex jusity-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'>
          Подтвердить
        </button>
        
        <Link 
            to ='/login'
            className='flex justify-center items-center text-xs text-white-400 mr-2'
        > Уже есть аккаунт? 
        </Link>
      </div>
    </form>
  )
}
