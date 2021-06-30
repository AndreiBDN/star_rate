import React, { useState } from 'react';
import { StarRating } from './component/StarRating';
import styles from './app.module.scss'

function App() {
  const [rate, setRate] = useState<number>(0)
  const [showRate, setShowRate] = useState<number>(0)
  return (
    <div className={styles.wrapper}>
      <div className={styles.appWrapper}>
        <header className={styles.header}>
          <h2 className={styles.rateTitle}>Rate us!</h2>
        </header>
        <StarRating
              onChange= { setRate }
              number={ 10 }
              rate= { rate }
              onShowCurrentRate= { setShowRate }
          />

        <div className={styles.rate}>{showRate}</div>
      </div>
    </div>
  );
}

export default App;
