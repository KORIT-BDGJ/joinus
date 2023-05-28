import React from 'react';
import { useParams } from 'react-router-dom';
import ResetPasswordModal from '../../components/Modal/ResetPasswordModal';

const ResetPassword = () => {
    const {temporaryToken} = useParams();
    return (
        <div>
            <ResetPasswordModal />
        </div>
    );
};

export default ResetPassword;