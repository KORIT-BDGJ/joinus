/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import AlertModal from './AlertModal';

const EvaluateModal = ({ isModalOpen, confirmRemove, cancelRemove, onClose, message, users }) => (
    <AlertModal
        isModalOpen={isModalOpen}
        confirmRemove={confirmRemove}
        cancelRemove={cancelRemove}
        onClose={onClose}
    >
        <p>{message}</p>
        {users && users.map(user => 
            <p key={user.userId}>{`${user.username}: ${user.medalCount} stars`}</p>
        )}
    </AlertModal>
);

export default EvaluateModal;