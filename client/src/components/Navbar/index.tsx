import React from 'react';

import styles from './styles.module.scss';
import ConnectWallet from '../ConnectWallet';

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>RainyPot.io</h2>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
