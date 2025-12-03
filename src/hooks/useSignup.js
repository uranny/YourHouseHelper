import { useState } from 'react';

export function useSignup() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        setTimeout(() => {
        if (!id || !pw) {
            setError('아이디와 비밀번호를 입력하세요.');
        } else if (pw !== pwCheck) {
            setError('비밀번호가 일치하지 않습니다.');
        } else {
            localStorage.setItem('accountbook-user', JSON.stringify({ id, pw }));
            setSuccess(true);
            setError('');
            setTimeout(() => {
            window.location.href = '/signin';
            }, 1200);
        }
        setLoading(false);
        }, 600);
    };

    return {
        id, setId, pw, setPw, pwCheck, setPwCheck, error, success, loading, handleSignup
    };
}
