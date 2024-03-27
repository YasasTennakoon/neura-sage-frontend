import { useState } from "react";
import { Container, Row, Col, Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from "react";
import audio from './Rev.mp3';
import image from './pencil.jpeg'
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CognitiveExamination = () => {

    const audioRef = useRef(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [userInput, setUserInput] = useState("");
    const [quizStatus, setQuizStatus] = useState(false);
    const [noCorrectQuestions, setNoCorrectQuestions] = useState(0);
    const history = useNavigate();

    const correctAnswers = {
        year: new Date().getFullYear().toString(),
        month: new Date().toLocaleString('default', { month: 'long' }),
        date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        dayOfWeek: new Date().toLocaleString('default', { weekday: 'long' }),
        recallAudio: "apple,pencil,key",
        transcription: "The sky is blue",
        location: "IIT",
        city: "Colombo",
        objectIdentification: "pencil"
    };

    const playAudio = () => {
        audioRef.current.play();
    };
    const [questions, setQuestins] = useState([
        { question: "What is the current year?", id: "year", status: false },
        { question: "What month is it currently?", id: "month", status: false },
        { question: "What is today's date? Please use the format DD/MM/YYYY.", id: "date", status: false },
        { question: "Can you tell me what day of the week it is today?", id: "dayOfWeek", status: false },
        { question: "You will be presented with an audio clip containing several words. Please listen to it attentively, as you will be asked questions about its content later.", id: "audioTask", type: "audio" },
        { question: "Please rewrite the sentence displayed on your screen in the provided text box.", id: "transcription", type: "identify", status: false },
        { question: "Where are we currently? Specify the type of place or building.", id: "location", status: false },
        { question: "What city are we in right now?", id: "city", status: false },
        { question: "Can you recall the words you heard in the audio clip earlier and write them down? (Use a ' , ' to seperate the words)", id: "recallAudio", status: false },
        { question: "You will see an image of an object on your screen. What is this object called?", id: "objectIdentification", type: "image", status: false },
    ]);


    const handleAnswer = (answer) => {
        const questionId = questions[currentQuestionIndex].id;
        const isCorrect = checkAnswer(questionId, answer);
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));

        if (isCorrect) {
            setNoCorrectQuestions(noCorrectQuestions + 1);
            const updatedQuestions = questions.map(q =>
                q.id === questionId ? { ...q, status: true } : q
            );


            setQuestins(updatedQuestions);

            if (questionId == "recallAudio") {
                setScore(score + 6);
            } else {
                setScore(score + 3);
            }
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserInput("");
        } else {
            console.log(questions);
            setQuizStatus(true);
        }
    };

    const checkAnswer = (questionId, answer) => {
        const normalizedAnswer = answer.trim().toLowerCase();
        const correctAnswer = correctAnswers[questionId]?.toLowerCase();
        return normalizedAnswer === correctAnswer;
    };

    const handleNavigation = () => {
        history('/file-upload');
    }

    const onRetakeQuiz = () => {
        setQuizStatus(false);
        setCurrentQuestionIndex(0);
        handleCancel();
        setNoCorrectQuestions(0);
        setScore(0);
    }

    const handleCancel = () => {
        const updatedQuestions = questions.map(question => ({
            ...question,
            status: false // Set status to false for each question
        }));
        setQuestins(updatedQuestions); // Update the state with the new array
    };

    const onCancelQuiz = () => {
        setCurrentQuestionIndex(0);
        handleCancel();
        setNoCorrectQuestions(0);
        setScore(0);
    }

    const renderButtons = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => (
            <Button
                key={start + i}
                onClick={() => setCurrentQuestionIndex(start + i - 1)}
                className={currentQuestionIndex === start + i - 1 ? 'question-numbers' : 'question-numbers-inactive'}
            >
                {start + i}
            </Button>
        ));
    };


    return (
        <div>
            {quizStatus ? (
                <div className="d-flex flex-row">
                    <div className="cognitive-card">
                        <div className="quiz-result-container">
                            <Card style={{ width: '50rem', height: '35rem' }} className='card-custom-border'>
                                <div className="p-2">
                                    <div className="pb-2 question-container-tilte text-center">Quize Results</div>
                                    <div className="p-3 mmse-score">The user has anserwed {noCorrectQuestions} questions correclty. The partiepants MMSE score - <b>{score}</b></div>
                                    <Card className='p-3 card-custom-border'>
                                        <div className="quiz-analysis text-center">Question Analysis</div>
                                        {questions.map((item, index) => (
                                            <div>
                                                {item.type !== "audio" && (
                                                    <div key={index} className="pb-3 correct-questions">{index + 1}. {item.question} - {item.status ? <span className="correct-answer-staus">Correct</span> : <span className="wrong-answer-staus">Wrong</span>}</div>
                                                )}
                                            </div>
                                        ))}
                                    </Card>
                                </div>
                                <div className="quiz-btn">
                                    <Button onClick={onRetakeQuiz} className="next-btn">Retake Quiz</Button>
                                    <Button onClick={handleNavigation} className="next-btn">Predict Disease</Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div>
                        <Card style={{ width: '17rem', height: '25em' }} className='card-custom-border'>
                            <div className="quiz-question-number-title">
                                <div className="question-number-title-content">
                                    <div>
                                        Cognitive Score Analysis
                                    </div>
                                </div>
                            </div>
                            <Card.Body>
                                <div className="d-flex flex-column">
                                    <div className="score-analysis-content">27-30: No cognitive</div>
                                    <div className="score-analysis-content">20-26: Mild cognitive</div>
                                    <div className="score-analysis-content">10-19: Moderate cognitive</div>
                                    <div className="score-analysis-content">Below 10: Severe cognitive</div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            ) : (<div className="d-flex flex-row">
                <div className="cognitive-card">
                    <Card style={{ width: '50rem', height: '25em' }} className='card-custom-border'>
                        <div className="question-container-tilte text-center">Cognitive Examination</div>
                        <Card.Body>
                            <div className="question-container">
                                {(questions[currentQuestionIndex].type == "audio") || (questions[currentQuestionIndex].type == "image") ? (
                                    <div>
                                        {questions[currentQuestionIndex].type == "audio" ? (
                                            <div>
                                                <div className="question-heading">Listening Exam</div><div className="question">{questions[currentQuestionIndex].question}</div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="question-heading">Visual Exam</div><div className="question">{questions[currentQuestionIndex].question}</div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <><div className="question-heading">Question {currentQuestionIndex + 1}</div><div className="question">{questions[currentQuestionIndex].question}</div></>

                                )}
                            </div>
                            <div>
                                <div>
                                    {(questions[currentQuestionIndex].type == "audio") || (questions[currentQuestionIndex].type == "image") || (questions[currentQuestionIndex].type == "identify") ? (
                                        <div>
                                            {questions[currentQuestionIndex].type == "audio" ? (
                                                <div>
                                                    <div className=" p-2 d-flex flex-row">
                                                        <div className="d-flex flex-column justify-content-center question">
                                                            Please press the play button to play the audio -
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <audio ref={audioRef} src={audio}></audio>
                                                            <FaPlayCircle size={30} onClick={playAudio} />
                                                        </div>
                                                    </div>
                                                </div>) : (
                                                <div>
                                                    {(questions[currentQuestionIndex].type == "identify") ? (
                                                        <div>
                                                            <div className="sample-text pt-3 pb-3">"The sky is blue"</div>
                                                            <Form onSubmit={handleAnswer}>
                                                                <Form.Group>
                                                                    <Form.Control
                                                                        className='small-input quiz-answer-input'
                                                                        type="text"
                                                                        value={userInput}
                                                                        onChange={(e) => setUserInput(e.target.value)}
                                                                        placeholder="Type your answer here..."
                                                                    />
                                                                </Form.Group>
                                                            </Form>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="pb-2"><img src={image} className="visual-exam-image" /></div>
                                                            <Form onSubmit={handleAnswer}>
                                                                <Form.Group>
                                                                    <Form.Control
                                                                        className='small-input quiz-answer-input'
                                                                        type="text"
                                                                        value={userInput}
                                                                        onChange={(e) => setUserInput(e.target.value)}
                                                                        placeholder="Type your answer here..."
                                                                    />
                                                                </Form.Group>
                                                            </Form>
                                                        </div>
                                                    )}
                                                    <div>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Form onSubmit={handleAnswer}>
                                            <Form.Group>
                                                <Form.Control
                                                    className='small-input quiz-answer-input'
                                                    type="text"
                                                    value={userInput}
                                                    onChange={(e) => setUserInput(e.target.value)}
                                                    placeholder="Type your answer here..."
                                                />
                                            </Form.Group>
                                        </Form>
                                    )}
                                </div>
                            </div>
                        </Card.Body>
                        <div className="quiz-btn">
                            <Button onClick={(e) => handleAnswer(userInput)} className="next-btn">Next</Button>
                            <Button onClick={onCancelQuiz} className="next-btn" variant="danger">Cancel</Button>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card style={{ width: '17rem', height: '25em' }} className='card-custom-border'>
                        <div className="quiz-question-number-title">
                            <div className="question-number-title-content">
                                <div>
                                    Question {currentQuestionIndex + 1}/{10}
                                </div>
                                <div>
                                    Need Help ?
                                </div>
                            </div>
                        </div>
                        <Card.Body>
                            <div className="d-flex flex-row justify-content-between mb-2">
                                {renderButtons(1, 5)}
                            </div>
                            <div className="d-flex flex-row justify-content-between mb-2">
                                {renderButtons(6, 10)}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>)}
        </div>
    );
}

export default CognitiveExamination;