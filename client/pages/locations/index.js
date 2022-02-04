import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

import { LOCATIONS } from '../../services/routes';

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      const locations = await LOCATIONS.getList();
      if (locations) setLocations(locations);
    })();
  }, []);
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Trabalho Final IoT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href="/">
          <p>Voltar</p>
        </a>

        <p className={styles.description}>
          Localizações Salvas
        </p>

        {locations.reverse().map((location, index) => {
          return (
            <code key={index} className={styles.code}>{index}: Lat: {location.lat} Lng: {location.lng}</code>
          );
        })}   
      </main>
    </div>
  )
}
