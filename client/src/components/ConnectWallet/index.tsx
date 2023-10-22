'use client';

import React, { useEffect, useState } from 'react';
import { AppConfig, showConnect, UserSession } from '@stacks/connect';

import styles from './styles.module.scss';
import MyRequests from '../MyRequests';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: 'RainyPot.io',
      icon: window.location.origin + '/logo512.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut('/');
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [address, setAddress] = useState('');

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const menuRef = React.useRef<any>();
  const popupState = React.useRef(isPopupOpen);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setAddress(
        userSession.loadUserData()?.profile?.stxAddress?.testnet.slice(0, 5) +
          '...' +
          userSession.loadUserData()?.profile?.stxAddress?.testnet.slice(-3),
      );
    }
  }, [userSession.isUserSignedIn()]);

  React.useEffect(() => {
    popupState.current = isPopupOpen;
  }, [isPopupOpen]);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.code === 'Escape' && popupState.current === true) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyPressHandler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div ref={menuRef}>
        <div onClick={() => setIsPopupOpen((prev) => !prev)} className={styles.wrapper}>
          <p className={styles.address}>{address}</p>
          <div className={styles.ava}></div>
        </div>
        {isPopupOpen && (
          <div className={styles.popup}>
            <div className={styles.header}>
              <div className={styles.accountDetails}>
                <div className={styles.ava}></div>
                <p className={styles.address}>{address}</p>
              </div>
              <button className={styles.disconnectBtn} onClick={disconnect}>
                Log out
              </button>
            </div>
            <MyRequests />
          </div>
        )}
      </div>
    );
  }

  return (
    <button ref={menuRef} className={styles.connectBtn} onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
