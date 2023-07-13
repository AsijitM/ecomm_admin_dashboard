'use client';

import { useState } from 'react';
import { StoreModal } from './store-modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};
