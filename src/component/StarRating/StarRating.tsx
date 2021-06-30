import React, {
    FC,
    useCallback,
    useEffect,
    useState,
} from 'react'
import styles from './StarRating.module.scss'

import { ReactComponent as EmptyIcon } from './defaultIcons/emptyStar.svg'
import { ReactComponent as FullIcon } from './defaultIcons/fullStar.svg'

type Props = {
    rate: number
    isEdit?: boolean
    onChange: (n: number) => void
    onShowCurrentRate?: (n: number) => void
    emptyIcon?: JSX.Element
    fullIcon?: JSX.Element
    number: number
    error?: boolean
    errorText?: string
    labeled?: boolean
}

/**
 * 
 * @param rate * - current rate
 * @param fullIcon - marked icon
 * @param emptyIcon - unmarked icon
 * @param onChange * - callback function - when rate is changing
 * @param onShowCurrentRate - callback function - returns current rate before it will enter
 * @param isEdit - boolean type/ if true we can change the rate
 * @param number * - max value of the rate
 * @param labeled - boolean type/ shows label
 * @param error - boolean type/ if true shows ERROR
 * @param errorText - errors text
 * @returns - Star rate component
 */
const StarRating: FC<Props> = ({
    rate,
    fullIcon = <FullIcon />,
    emptyIcon = <EmptyIcon />,
    onChange,
    isEdit = true,
    number = 10,
    error,
    errorText,
    labeled = false,
    onShowCurrentRate
}) => {
    const [currentRate, setCurrentRate] = useState<number>(rate)
    const [rateLabel, setRateLabel] = useState<string>('')

    const labelRate = (n: number) => {
        let label: string = ''

        if (n > 0 && n <= 2) {
            label = 'horrible'
        }
        if (n > 2 && n < 5) {
            label = 'bad'
        }
        if (n > 4 && n < 7) {
            label = 'normal'
        }
        if (n > 6 && n < 9) {
            label = 'good'
        }
        if (n > 8) {
            label = 'excellent'
        }
        return label
    }

    useEffect(() => {
        setCurrentRate(rate)
        
    }, [rate])

    const onHandleChange = useCallback(() : void => {
        if (onChange) {
            onChange(currentRate)
        }
    }, [currentRate, setCurrentRate, rate])

    const onHandleEnter = useCallback(
        (n: number): void => {
            if (isEdit) {
                setCurrentRate(n)
                if(onShowCurrentRate){
                    onShowCurrentRate(n)
                }
                setRateLabel(labelRate(n))
            }
        },
        [currentRate, setCurrentRate, onHandleChange]
    )

    const onHandleLeave = useCallback((): void => {
        if (isEdit) {
            setCurrentRate(rate)
            if(onShowCurrentRate){
                onShowCurrentRate(rate)
            }
            setRateLabel(labelRate(rate))
        }
    }, [currentRate, setCurrentRate, onHandleChange])

    const createEmptyRate: Array<any> = []
    for (let i = 0; i < currentRate; i++) {
        createEmptyRate.push(
            <div
                className={styles.star}
                onClick={onHandleChange}
                onMouseLeave={onHandleLeave}
                onMouseOver={() => onHandleEnter(i + 1)}
            >
                {fullIcon}
            </div>
        )
    }
    for (let i = currentRate; i < number; i++) {
        createEmptyRate.push(
            <div
                className={styles.star}
                onMouseLeave={onHandleLeave}
                onMouseOver={() => onHandleEnter(i + 1)}
            >
                {emptyIcon}
            </div>
        )
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.feedbackBlock}>
                    {createEmptyRate.map((item) => {
                        return item
                    })}
                </div>
                {labeled && <div className={styles.label}>{rateLabel}</div>}
            </div>
            {error && <div className={styles.errorMessage}>{errorText}</div>}
        </>
    )
}

export default StarRating
