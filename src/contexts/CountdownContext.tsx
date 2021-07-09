import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { ChallengesContext } from './ChallengesContext';

//separando um context somente para o Countdown. tirado do ChallengesContext.
//incluindo regra de negocio relacionado ao countdown

interface CountdownContextData { 
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: ()=> void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);//contexto segue este formato

let countdownTimeout: NodeJS.Timeout;


export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [ time, setTime ] = useState(20 * 60);
    const [ isActive, setIsActive ] = useState(false);
    const [ hasFinished, setHasFinished ] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    
    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false); //fazer o useEffect parar
        setHasFinished(false) //no Countdown, hasFinished = true torna botão 'disabled', aqui 'enabled'
        setTime(0.1 * 60);

    }

    useEffect(() => {
        // console.log(isActive);
        if(isActive && time > 0) {
           countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            },1000)
        } else if(isActive && time === 0) {
            // console.log('finalizou')
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
//executar a função quando isActive muda(ao clicar botão), e continuar  enquanto time muda(cada segundo)
    }, [isActive, time]) 

    return (
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown
                }}>
            {children}
        </CountdownContext.Provider>
    )
}