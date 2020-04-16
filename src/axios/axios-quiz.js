import axios from 'axios'

export default axios.create({
        baseURL: 'https://react-quiz-2ea43.firebaseio.com/'
    }
)