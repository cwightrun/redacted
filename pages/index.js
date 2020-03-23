import Head from 'next/head';
import YouTube from 'react-youtube';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { render } from 'react-dom';

const Player = props => {
  const opts = {
    playerVars: {
      autoplay: 0,
      modestBranding: 1,
      showinfo: 0
    }
  }

  const [isPlaying, setPlaying] = useState(false)
  const [isFirstPlay, setFirstPlay] = useState(false)

  function handlePlayerStateChange(event) {
    console.log('>>> event', event);
    if (event.data === 2) {
      setPlaying(false);
    } else if (event.data === null) {
      setPlaying(false);
      setFirstPlay(true);
      setTimeout(() => {
        setFirstPlay(false)
      }, 4000);
    } else {
      setPlaying(true);
    }
  }

  const playerStateClass = isPlaying ? '' : 'showRedact';
  const firstPlayClass = isFirstPlay ? 'isFirstPlay' : '';

  return (
    <div className={`videoWrapper ${playerStateClass} ${firstPlayClass}`}>
      <div className='redact playerRedact redactTitle'></div>
      <div className='redact playerRedact redactAvatar'></div>

      <YouTube
        videoId={props.vid}
        containerClassName='embed-container'
        opts={opts}
        onReady={handlePlayerStateChange}
        onPause={handlePlayerStateChange}
        onPlay={handlePlayerStateChange}
      />
    </div>
  );
};

const Form = props => {
  return (
    <div className='form'>
      <form>
        <input type="text" placeholder="YouTube URL here." />
      </form>
    </div>
  )
}

const Home = props => {
  return (
    <div className='container'>
      <Head>
        <title>Redacted</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1><span className='redact'></span>Redacted</h1>
        <h2>(do not go fullscreen)</h2>
        {props.vid ? (
          <Player vid={props.vid} />
        ) : (
          <Form />
        )}
      </main>

      <footer>What the hell is this?</footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          width: 90vw;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main h1 {
          position: relative;
          line-height: 1rem;
          font-size: 48px;
          margin-bottom: 0;
        }

        main h1 span {
          width: calc(100% + 12px);
          height: 30px;
          top: -6px;
          left: -6px;
          transform: rotate(-1deg);
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .redact {
          position: absolute;
          z-index: 999;
          background: rgba(0, 0, 0, 0.95);
          transition: opacity 0ms linear 100ms;
        }

        .videoWrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          width: 90vw;
          margin: auto;
        }

        .videoWrapper .redact {
          opacity: 0;
        }

        .videoWrapper:hover .redact,
        .videoWrapper:active .redact,
        .videoWrapper:focus .redact,
        .videoWrapper:focus-within .redact {
          opacity: 1;
          transition: opacity 0ms linear 0ms;
        }

        .videoWrapper.showRedact .redact {
          opacity: 1;
        }

        .videoWrapper.isFirstPlay .redact {
          transition-delay: 3s;
        }

        .videoWrapper.isFirstPlay:hover .redact,
        .videoWrapper.isFirstPlay:active .redact,
        .videoWrapper.isFirstPlay:focus .redact,
        .videoWrapper.isFirstPlay:focus-within .redact {
          transition-delay: 0s;
        }

        .embed-container {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          max-width: 100%;
          width: 100%;
        }

        .embed-container iframe,
        .embed-container iframe#youtube-component,
        .embed-container object,
        .embed-container embed {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .redactAvatar,
        .redactTitle {
          pointer-events: none;
        }

        .redactAvatar {
          width: 38px;
          height: 38px;
          top: 12px;
          left: 12px;
          transform: rotate(-1deg);
        }

        .redactTitle {
          width: 80%;
          height: 24px;
          top: 18px;
          left: 60px;
          transform: rotate(-1deg);
        }

        iframe .ytp-title-link {
          display: none !important;
        }

        .ytp-chrome-top.ytp-show-cards-title {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

Home.getInitialProps = ({ query }) => {
  return {
    vid: query.vid
  };
};

export default Home;
