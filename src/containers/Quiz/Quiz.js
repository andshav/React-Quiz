import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        result: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true

    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onAnswerClickHandler = answerId => {

        const results = this.state.result;
        const question = this.state.quiz[this.state.activeQuestion];
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            this.setState({
                results,
                answerState: {[answerId]: 'success'}
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout)
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                results,
                answerState: {[answerId]: 'error'}
            });
        }


    };
    onRetryHandler = () => {
        this.setState({
            result: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`);
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            });
            console.log(this.state.quiz)
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div className={classes.Quiz}>
                {
                    this.state.loading
                        ? <Loader/>
                        : <div className={classes.QuizWrapper}>

                            {this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.result}
                                    quiz={this.state.quiz}
                                    onRetry={this.onRetryHandler}
                                />
                                :
                                <ActiveQuiz
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    answers={this.state.quiz[this.state.activeQuestion].answer}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLenght={this.state.quiz.length}
                                    questionNumber={this.state.activeQuestion + 1}
                                    answerState={this.state.answerState}
                                />

                            }

                        </div>
                }

            </div>
        )
    }
}

export default Quiz