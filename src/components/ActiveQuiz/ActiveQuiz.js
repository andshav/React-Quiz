import React from "react";
import classes from './ActiveQuiz.module.css'
import AnswersList from "./AnswersList/AnswersList";


const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <h1>Ответьте на вопрос</h1>
        <p className={classes.Question}>
            <span>
                <strong>{props.questionNumber}. </strong>
                {props.question}
            </span>
            <small>{props.questionNumber} из {props.quizLenght}</small>
        </p>
        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            answerState={props.answerState}
        />
    </div>
);

export default ActiveQuiz

