import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../api/user';
import { QUERY_KEYS } from '../constants/query';

export function useSignup() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const signupMutation = useMutation({
        mutationKey: [QUERY_KEYS.SIGNUP],
        mutationFn: ({ username, password }) => userApi.signup({ username, password }),
        onSuccess: () => {
            setSuccess(true);
            setError('');
            setTimeout(() => {
                window.location.href = '/signin';
            }, 1200);
        },
        onError: (err) => {
            setError('회원가입에 실패했습니다.');
        },
    });

    const handleSignup = () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        if (!id || !pw) {
            setError('아이디와 비밀번호를 입력하세요.');
            setLoading(false);
            return;
        } else if (pw !== pwCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            setLoading(false);
            return;
        }
        signupMutation.mutate({ username: id, password: pw }, {
            onSettled: () => setLoading(false)
        });
    };

    return {
        id, setId, pw, setPw, pwCheck, setPwCheck, error, success, loading, handleSignup
    };
}
