import Button from "../Button";
import Watch from "./Watch";
import style from './Stopwatch.module.scss';
import { timeToSeconds } from "../../common/utils/time";
import { ITask } from "../../types/task";
import { useEffect, useState } from "react";

interface Props {
	selected: ITask | undefined,
	endTask: () => void
}

export default function Cronometro({ selected, endTask }: Props) {

	const [time, setTime] = useState<number>();

	useEffect(() => {
		if(selected?.time) {
			setTime(timeToSeconds(selected.time))
		}
	}, [selected])

	function timeStart(remainingTime: number = 0) {
		setTimeout(() => {
			if(remainingTime > 0) {
				setTime(remainingTime - 1);
				return timeStart(remainingTime - 1)
			}
			endTask();
		}, 1000);
	}

	return (
		<div className={style.cronometro}>
			<p className={style.titulo}> Escolha um card e inicie o cronômetro </p>
			<div className={style.relogioWrapper}>
				<Watch time={time}/>
			</div>
			<Button onClick={() => timeStart(time)}>
				Começar
			</Button>
		</div>
	)
}