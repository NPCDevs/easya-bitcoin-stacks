import React from 'react';

import styles from './styles.module.scss';

type status = 'Pending' | 'Approved' | 'Rejected';

interface RequestItemProps {
  title: string;
  address: string;
  amount: number;
  status: status;
}
const RequestItem: React.FC<RequestItemProps> = ({ title, address, amount, status }) => {
  return (
    <div className={styles.requestWrapper}>
      <div className={styles.info}>
        <h4 className={styles.title}>Title</h4>
        <p className={styles.address}>address</p>
      </div>
      <div
        className={styles.status}
        style={
          status === 'Approved'
            ? { borderColor: '#4989F0' }
            : status === 'Rejected'
            ? { borderColor: '#EB656D' }
            : {}
        }>
        <p>0.05 BTC</p>
      </div>
    </div>
  );
};

const MyRequests = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>My Requests</h3>
        <p className={styles.viewAll}>View All</p>
      </div>
      <div className={styles.list}>
        <RequestItem
          title="Queen Mary Fellas"
          address="sijdfofjskdojkfsddfkdls"
          amount={0.04}
          status={'Approved'}
        />
        <RequestItem
          title="Queen Mary Fellas"
          address="sijdfofjskdojkfsddfkdls"
          amount={0.04}
          status={'Rejected'}
        />
        <RequestItem
          title="Queen Mary Fellas"
          address="sijdfofjskdojkfsddfkdls"
          amount={0.04}
          status={'Pending'}
        />
      </div>
    </div>
  );
};

export default MyRequests;
