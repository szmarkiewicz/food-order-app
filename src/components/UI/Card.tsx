import {PropsWithChildren} from "react";
import styles from '../../styles/components/Card.module.scss';

type CardElevation = 'low' | 'medium' | 'high';

interface CardProps {
  elevation: CardElevation;
}

export default function Card(props: PropsWithChildren<CardProps>) {
  const {elevation, children} = props;

  return <div className={`${styles.card} elevation--${elevation}`}>
    {children}
  </div>
}