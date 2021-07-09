import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

//formatar o pros com tipagem, como 'any' é ruim, tbm incuir esta tipagem no ChallengesContext
interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
  // console.log(props);
  return (
    <ChallengesProvider //passando os valores dos cookies pro ChallengesContext, pelo Provider aqui
      level={props.level} //aquidava erro pq ChallengesProvider não tinha estes na tipagem, fazer noCC
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        
          {/* <Head>  CRIOU UM ARQUIVO 'RAIZ' _DOCUMENT.TSX, P/ GUARDAR ESTE HEAD
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet"/>
          </Head> */}

          <Head>
          {/* o favicon é igual em todas paginas, colocado no _document.tsx */}
            <title> Inicio | Shake-it-up</title> 
          </Head>

          <ExperienceBar />

          {/* unicos componentes que usam CountdownContext são o Countdown e o ChallengeBox */}

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown/>
              </div>

              <div>
                <ChallengeBox />

              </div>
            </section>
          </CountdownProvider>


        </div>
      </ChallengesProvider>
  )
}

//função para salvar cookies e disponibilizar app nos SEO do google...
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // const user = {
  //   level: 1,
  //   currentExperience: 50,
  //   challengesCompleted: 2,
  // }
  // console.log(user);

  //acesso a todos cookies da app, salvando estes 3 nos cookies 
  // const cookies = ctx.req.cookies; 

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies; 

  return {
    props: {  //informações vem dos cookies como string, converter p/ numero
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}