import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);
    // const hasActiveChallenge = true;

    function handleChallengeSucceded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown()
    }
    
    return (
        <div className={styles.challengeBoxContainer}>

            {activeChallenge ? (
                <div className={styles.challengeBoxActive}>
                    <header>Ganhe {activeChallenge.amount}</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Workout"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                            >
                            Falhei
                        </button>

                        <button
                            type="button"
                            className={styles.challengeSuccededButton}
                            onClick={handleChallengeSucceded}
                            >
                            Completei
                        </button>
                    </footer>

                </div>
            ) : (
                <div className={styles.challengeBoxNotActive}>
                <strong>Finalize um cliclo para receber um desafio</strong>
                <p>
                    <img src="icons/level.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>

            </div>
            )}

        </div>
    )
}