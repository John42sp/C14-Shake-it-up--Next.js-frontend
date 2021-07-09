import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; //biblioteca do js, vem sem as tipagens do TS
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

//ChallengesProvider = componente criado para abrigar o context com seus valores,a ser usado no _app.tsx
//Todos componentes abrigados no arquivo index.tsx, dentro do componente Home

interface Challenge {
    type: 'Body' | 'Eye';
    description: string;
    amount: number;

}
interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge; // typagem poderia ser 'object' mas seria escasso de informação
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeIsLevelUpModal:() => void;

}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number

}

export const ChallengesContext = createContext({} as ChallengesContextData);//contexto segue este formato

//colocando alem de children, as 3 outras variaveis como parametro, como objeto ...rest 
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    const [ level, setLevel ] = useState(rest.level ?? 1); // ?? = se não existir 
    const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0); 

    const [ activeChallenge, setActiveChallenge ] = useState(null);
    const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4 , 2) //formula rgba level+1 * 4, ao quadrado


    useEffect(() => {  //hook para nofificação web não funcionou
        //pedir permissões pra mandar notificações, Notificação. = api do proprio browser
        Notification.requestPermission();
    }, []);  //array vazio, fara useEffect disparar uma unica vez assim que componente for exibido em tela

      //HOOK P/ SALVAR DADOS DO USUÁRIO:
      useEffect(() => {

        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));


        //disparar função sempre q alterar 1 dos 3, a serem salvas nos cookies
    }, [level, currentExperience, challengesCompleted]) 

    function levelUp() {
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    function closeIsLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);//aqui soretorna i index
        const challenge = challenges[randomChallengeIndex]; //aqui retorn qual challenge da array p/ index, que é um objeto
        setActiveChallenge(challenge) //passando a 'challenge' pra estado 'activeChallenge'

        new Audio('/notification.mp3').play();

        // notificação web não funcionando. é customizavel, ver mdn nofification
        if(Notification.permission === "granted") {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }

    }

    function resetChallenge() {
        setActiveChallenge(null)

    }
//REGRA DE NEGOCIO MAIS IMPORTANTE DO APP NESTA FUNÇÃO:
    function completeChallenge() { //fará o cálculo de comportamento da ExperienceBar
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge; //se houver desafio em andamento (clicou Iniciar ciclo)
//currentExp: valor embaixo do progresso da barra
        let finalExperience = currentExperience + amount; //soma valor embaixo da barra com novo amount
//se esta soma for maior/= que experTo no final da barra, subir 1 nivel, subtrair todo valor do progresso da barra e deixar apenas a diferença
        if(finalExperience >= experienceToNextLevel) { 
            finalExperience = finalExperience - experienceToNextLevel;//subscrevendo finalExp c/ novo nevel
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1); //nº de desafios ocorridos, adiciona 1 a cada
    }
    
    return (

        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted, 
                activeChallenge,
                experienceToNextLevel, 
                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeIsLevelUpModal
                }}>

            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
            
        </ChallengesContext.Provider>
    )
}