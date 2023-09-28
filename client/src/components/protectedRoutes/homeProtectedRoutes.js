"use client"

import { useRouter } from 'next/navigation';

const HomeProtect = ({children}) => {
    const router=useRouter()
    if(localStorage.getItem("token")){
        return children
    }else{
        router.push("/login"); 
    }
 
}

export default HomeProtect