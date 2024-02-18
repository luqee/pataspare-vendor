'use client'
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'

export const RequireAuth = ({ children})=> {
    let {user} = useAuthContext()
    const router = useRouter()
    return user ? children: router.push('/auth/login')
}