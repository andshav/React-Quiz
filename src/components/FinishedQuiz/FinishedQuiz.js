import React from "react";
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    let rightCounter = 0;
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {

                    props.quiz.map((quiz, index) => {
                        const cls = [
                            'fa',
                            (props.results[quiz.id] === 'success')
                                ? (rightCounter++, 'fa-check') : 'fa-times',
                            classes[props.results[quiz.id]]
                        ];


                        return (
                            <li
                                key={index}
                            >
                                <strong>{index + 1}</strong>. &nbsp;
                                {quiz.question}
                                <i className={cls.join(' ')}/>
                            </li>


                        )
                    })

                }
            </ul>
            <p>Правильно {rightCounter} из {props.quiz.length}</p>
            <Button onClick={props.onRetry} type='primary'>Повторить</Button>
            <Link to='/'>
                <Button type='success'>Перейти к списку тестов</Button>
            </Link>

        </div>
    )
};

export default FinishedQuiz
