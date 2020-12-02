import React, {useReducer} from 'react'
import axios from 'axios'
import AuthReducer from './authReducer'
import AuthContext from './authContext'
import { REGISTER_SUCCESS } from '../types'

const AuthState = (props) => {

    const initialState = {
        token: null,
        user: []
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const register = async formData => {
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        try {
            //This returns a token with a payload of the id of the registering user
            const res = await axios.post('/api/users',formData,config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

        } catch (error) {
            //handle error
        }

    }

    return (
        <AuthContext.Provider
        value= {{
            token : state.token,
            register
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
