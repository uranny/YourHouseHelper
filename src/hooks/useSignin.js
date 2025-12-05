import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../api/user';
import { QUERY_KEYS } from '../constants/query';

export function useSignin() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const signinMutation = useMutation({
        mutationKey: [QUERY_KEYS.SIGNIN],
        mutationFn: ({ username, password }) => userApi.signin({ username, password }),
        onSuccess: (res) => {
            const { accessToken, refreshToken } = res.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setError('');
            window.location.href = '/dashboard';
        },
        onError: () => {
            setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        },
    });

    const handleSignin = () => {
        setLoading(true);
        setError('');
        signinMutation.mutate({ username: id, password: pw }, {
            onSettled: () => setLoading(false)
        });
    };

    return {
        id, setId, pw, setPw, error, loading, handleSignin
    };
}
