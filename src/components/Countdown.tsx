import { clear } from 'node:console';
import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function Countdown() {
    const { 
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);

    //unicas linhas que não foram para o CountdownContext, não sao regra de negocio, apenas parte visual
    //regra especifica deste componente de como esses dados são visualisados
    //sao 2 numeros sendo separados, quando o primeiro zerar, torna lo uma string zero 
    const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
    const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');



    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

             {/* <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountDown}
                >
                {isActive ? "Abandonar ciclo" : "Iniciar ciclo"}
            </button> */}


            {hasFinished ? (
                <button 
                    disabled
                    className={styles.countdownButton}
                 >
                 Ciclo encerrado
                </button>
            ) : (
            <>
                {isActive ? (
                <button 
                    type="button" //p/ apenas subscrever algumas propriedades de estilo quando active
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                    >
                    Abandonar ciclo
                </button>
            ): (
                <button 
                    type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    >
                    Iniciar ciclo
                </button>
            )}

            </>

            )}       

        </div>

    )
}