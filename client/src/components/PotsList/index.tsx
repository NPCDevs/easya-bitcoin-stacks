import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { useSearchParams } from 'next/navigation';

interface PotItemProps {
  title: string;
  totalMoney: number;
  depositAmount: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const PotItem: React.FC<PotItemProps> = ({
  title,
  totalMoney,
  depositAmount,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={styles.itemWrapper}
      style={
        isSelected
          ? {
              borderColor: '#4989F0',
            }
          : {}
      }>
      <div className={styles.row}>
        <p className={styles.title}>{title}</p>
        <div className={styles.depositAmountCon}>
          <p className={styles.depositAmountTxt}>Added {depositAmount} BTC</p>
        </div>
      </div>
      <h4 className={styles.totalMoney}>{totalMoney} BTC</h4>
      <div className={styles.row} style={{ gap: 12, marginTop: 32 }}>
        <div className={styles.primaryButton}>
          <p>Add money</p>
        </div>
        <div className={styles.secondaryButton}>
          <p>Withdraw</p>
        </div>
      </div>
    </div>
  );
};

const posts = [
  {
    // get random uuid long string
    uuid: '1',
    title: 'Queen Mary fellas',
    totalMoney: 0.5553,
    depositAmount: 0.0154,
  },
  {
    uuid: '2',
    title: 'eriuhjgkfdnsv',
    totalMoney: 0.5553,
    depositAmount: 0.0154,
  },
  {
    uuid: '3',
    title: 'Ivan Seagull',
    totalMoney: 0.5553,
    depositAmount: 0.0154,
  },
  {
    uuid: '4',
    title: 'Drugs pls',
    totalMoney: 0.5553,
    depositAmount: 0.0154,
  },
  {
    uuid: '5',
    title: 'More stuff',
    totalMoney: 0.5553,
    depositAmount: 0.0154,
  },
  {
    uuid: '6',
    title: 'shiiiit',
    totalMoney: 0.5553,
    depositAmount: 0.0154,
  },
  {
    uuid: '7',
    title: 'AMOGUS',
    totalMoney: 0.5553,
    depositAmount: 0.0154,
  },
];

interface PotsListProps {
  selectedPot: string;
  setSelectedPot: (uuid: string) => void;
}

const PotsList: React.FC<PotsListProps> = ({ selectedPot, setSelectedPot }) => {
  const searchParams = useSearchParams();

  return (
    <div className={styles.wrapper}>
      {posts.map((post) => (
        <PotItem
          key={post.uuid}
          {...post}
          onClick={() => setSelectedPot(post.uuid)}
          isSelected={selectedPot === post.uuid}
        />
      ))}
    </div>
  );
};

export default PotsList;
