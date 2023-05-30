import React, { useState } from 'react';
import ResetPasswordModal from '../../components/Modal/ResetPasswordModal';

const ResetPassword = () => {

    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <ResetPasswordModal  setIsOpen={setIsOpen}/>
        </div>
    );
};

export default ResetPassword;