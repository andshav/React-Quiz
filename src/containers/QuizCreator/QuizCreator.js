import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import axios from '../../axios/axios-quiz'


function createOptionControl(number) {
    return createControl({
        label: 'Вариант ' + number,
        errorMessage: 'Вариант не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = () => {
        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answer: [
                {
                    text: option1.value,
                    id: option1.id
                },
                {
                    text: option2.value,
                    id: option2.id
                },
                {
                    text: option3.value,
                    id: option3.id
                },
                {
                    text: option4.value,
                    id: option4.id
                },
            ]
        };
        quiz.push(questionItem);
        this.setState({
            quiz,
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    };
    createQuizHandler = async () => {

        try {
            await axios.post('quizes.json',this.state.quiz);
            this.setState({
                quiz: [],
                isFormValid: false,
                formControls: createFormControls(),
                rightAnswerId: 1

            })
        } catch (e) {
            console.log(e)
        }
    };
    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        touched={control.touched}
                        label={control.label}
                        valid={control.valid}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {
                        index === 0 ? <hr/> : null
                    }
                </Auxiliary>

            )
        })
    }

    selectChangeHandler = event => {
        this.setState({rightAnswerId: +event.target.value})
    }

    render() {
        const select = <Select
            label='Выберете правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>


                        {this.renderInputs()}
                        {select}

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}