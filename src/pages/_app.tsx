//aqrquivo onde componentes, sidebars tudo que estiver em todas pges da app estarão, e importação de estilo

import '../styles/global.css';
import  { ChallengesProvider } from '../contexts/ChallengesContext';
import { useState } from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {  



  return (
    // <CountdownProvider>
    //   <ChallengesProvider>   
    //       <Component {...pageProps} />
    //   </ChallengesProvider>
    // </CountdownProvider>

    //ou embrulhando os componentes com CountdownProvider direto no index.tsx
      // <ChallengesProvider>   
      //   <Component {...pageProps} />
      // </ChallengesProvider>

      
      <Component {...pageProps} />    

  )
}

export default MyApp
