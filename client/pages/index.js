import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { LOCATIONS } from '../services/routes';

export default function Home() {
  const [last_location, setLastLocation] = useState({lat: '', lng: ''});
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    (async () => {
      const locations = await LOCATIONS.getList();
      if (locations) {
        setLastLocation(locations[locations.length-1])
      };
    })();
  }, []);

  const toRad = (value) => {
    return value * Math.PI / 180;
  }

  const calcCrow = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    console.log(`a`, a)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    console.log(`c`, c)
    var d = R * c;
    console.log(`d`, d)
    return d;
  }
  
  const calculateDistance = (event) => {
    event.preventDefault();
    if (last_location.lng != '' && last_location.lat != '' && lat != '' && lng != '') {
      const value = calcCrow(last_location.lat, last_location.lng, lat, lng);
      console.log(value)
      setDistance(value);
    }
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Trabalho Final IoT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Trabalho Final de IoT
        </h1>

        <p className={styles.description}>
          Última localização
        </p>

        <code className={styles.code}>Lat: {last_location.lat} Lng: {last_location.lng}</code>
        
        <p className={styles.description}>
          Sua localização {distance != null ? ` : Você está a ${distance} km` : ''}
        </p>
        
        <form onSubmit={calculateDistance}>
          <label>
            Lat:
            <input type="text" value={lat} onChange={e => setLat(e.target.value)} />
          </label>
          <br />
          <label>
            Lng:
            <input type="text" value={lng} onChange={e => setLng(e.target.value)} />
          </label>
          <br />
          <input type="submit" value="Calcular" />
        </form>

        <div className={styles.grid}>
          <a href="locations" className={styles.card}>
            <h2>Lista Completa &rarr;</h2>
            <p>Lista com todos os pontos salvos.</p>
          </a>
        </div>
      </main>
    </div>
  )
}
