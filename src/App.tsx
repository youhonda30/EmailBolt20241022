import React, { useState } from 'react';
import EmailComposer from './components/EmailComposer';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState<'html' | 'plain'>('html');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>メール作成</h1>
      <div className={styles.topContainer}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${
              activeTab === 'html' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('html')}
          >
            HTMLメール
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === 'plain' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('plain')}
          >
            テキストメール
          </button>
        </div>
      </div>
      <EmailComposer activeTab={activeTab} />
    </div>
  );
}

export default App;