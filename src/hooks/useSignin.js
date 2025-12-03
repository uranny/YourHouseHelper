import { useState } from 'react';

export function useSignin() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 임시: localStorage에 저장된 회원정보로 로그인
    const handleSignin = () => {
        setLoading(true);
        setError('');
        setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('accountbook-user') || '{}');
        if (user.id === id && user.pw === pw) {
            setError('');
            window.location.href = '/dashboard';
        } else {
            setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
        setLoading(false);
        }, 600);
    };

    return {
        id, setId, pw, setPw, error, loading, handleSignin
    };
}
