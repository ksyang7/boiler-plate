import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null){
    // option
    // null -> 아무나 출입이 가능한 페이지 (Landing Page, About Page)
    // true -> 로그인한 유저만 출입이 가능한 페이지 (Detail Page)
    // false -> 로그인한 유저는 출입 불가능한 페이지 (Register Page, Login Page)
    // 관리자만 진입 가능한 페이지 (Admin Page)

    //const history = useHistory();

    function AuthenticationCheck(props){
        
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                //console.log(response)
                
                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAmdin){
                        props.history.push('/')
                    } else {
                        if(option === false)
                        props.history.push('/')
                    }
                }
            })
        }, [])
        return(
            <SpecificComponent />
        )
    }



    return AuthenticationCheck
}