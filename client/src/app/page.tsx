'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

import { Connect } from '@stacks/connect-react';

import { userSession } from '../components/ConnectWallet';
import PotsList from '@/components/PotsList';

const tabs = ['My pots', 'Public pots', 'Requests'];

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [selectedPot, setSelectedPot] = useState('');

  if (!isClient) return null;

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: 'RainyPot.io description',
          icon: window.location.origin + '/logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}>
      <main className={styles.main}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.menu}>
              <div className={styles.tabsCon}>
                {tabs.map((tab, index) => (
                  <div key={index} className={styles.tabCon}>
                    <p
                      className={activeTab === index ? styles.activeTab : styles.tab}
                      onClick={() => setActiveTab(index)}>
                      {tab}
                    </p>
                    {index === 2 && <div className={styles.circle} />}
                  </div>
                ))}
              </div>
              <PotsList selectedPot={selectedPot} setSelectedPot={setSelectedPot} />
            </div>
          </div>
        </div>
      </main>
    </Connect>
  );
}
