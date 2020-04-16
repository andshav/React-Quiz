import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import {Route, Switch} from 'react-router-dom'
import QuizCreator from "./containers/QuizCreator/QuizCreator";

import QuizList from "./containers/QuizList/QuizList";

class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>

                    <Route path='/quiz-creator' component={QuizCreator}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/' component={QuizList}/>
                </Switch>
            </Layout>
        );
    }
}

export default App;
