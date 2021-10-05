import Head from 'next/head';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import copy from 'copy-to-clipboard';
import styles from '../styles/index.module.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');
  const fakeName = `${filename}.fake`;

  const downloadUrl = `/api/download/${encodeURIComponent(
    fakeName
  )}?url=${encodeURIComponent(url)}`;

  const onUrlChange = (e) => {
    const url = e.target.value || '';
    setUrl(url);
    const originFilename = url.split('/').pop();
    setFilename(originFilename);
    console.log(originFilename);
  };

  const onDownload = (e) => {
    if (!RegExp('^((https|http|ftp)?://)[^s]+').test(url)) {
      alert('please input a valid url');
      return;
    }
    saveAs(downloadUrl, fakeName);
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Download</title>
      </Head>
      <h5> url </h5>
      <textarea
        className={styles.urlInput}
        value={url}
        onChange={onUrlChange}
      />
      <h5> filename </h5>
      <div className={styles.filename}>
        <input value={filename} onChange={(e) => setFilename(e.target.value)} />
        .fake
      </div>
      <button
        className={styles.downloadButton}
        onClick={onDownload}
        download={fakeName}
      >
        downloaded
      </button>
      <button
        className={styles.downloadButton}
        onClick={() => copy(`${window.location.origin}${downloadUrl}`)}
      >
        copy download url
      </button>
    </div>
  );
}
