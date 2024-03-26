import { useState } from "react";
import { Container, Row, Col, Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from "react";
import audio from './Rev.mp3';
import image from './photo.jpg'
import { FaPlayCircle } from "react-icons/fa";

const CognitiveExamination = () => {

    const audioRef = useRef(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [userInput, setUserInput] = useState("");
    const [quizStatus,setQuizStatus] =useState(false)

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
    const questions = [
        { question: "What is the current year?", id: "year" },
        { question: "What month is it currently?", id: "month" },
        { question: "What is today's date? Please use the format DD/MM/YYYY.", id: "date" },
        { question: "Can you tell me what day of the week it is today?", id: "dayOfWeek" },
        { question: "You will be presented with an audio clip containing several words. Please listen to it attentively, as you will be asked questions about its content later.", id: "audioTask", type: "audio" },
        { question: "Please rewrite the sentence displayed on your screen in the provided text box.", id: "transcription", type:"identify" },
        { question: "Where are we currently? Specify the type of place or building.", id: "location" },
        { question: "What city are we in right now?", id: "city" },
        { question: "Can you recall the words you heard in the audio clip earlier and write them down? (Use a ' , ' to seperate the words)", id: "recallAudio" },
        { question: "You will see an image of an object on your screen. What is this object called?", id: "objectIdentification", type: "image" },
    ];


    const handleAnswer = (answer) => {
        const questionId = questions[currentQuestionIndex].id;
        const isCorrect = checkAnswer(questionId, answer);
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));

        if (isCorrect) {
            console.log(questionId);
            if(questionId == "recallAudio"){
                setScore(score + 9);
            }else{
                setScore(score + 3);
            }
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserInput("");
        } else {
            setQuizStatus(true)
            // alert(`Quiz completed! Your MMSE score is ${score} out of 30.`);
        }
    };

    const checkAnswer = (questionId, answer) => {
        const normalizedAnswer = answer.trim().toLowerCase();
        const correctAnswer = correctAnswers[questionId]?.toLowerCase();
        console.log(normalizedAnswer);
        console.log(correctAnswer);
        console.log(normalizedAnswer === correctAnswer);

        return normalizedAnswer === correctAnswer;
    };

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
                            <div>
                            <Card>dfdf</Card>
                        </div>
            ):(
                <div className="d-flex flex-row">
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
                                                        ):(
                                                            <div>
                                                 <img src={image} style={{ width: '130px', height: 'auto' }} />
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
                            <Button onClick={(e) => handleAnswer(userInput)} className="next-btn" variant="danger">Cancel</Button>
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
            </div>
            )}
            {/* <div className="d-flex flex-row">
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
                                                        ):(
                                                            <div>
                                                 <img src={image} style={{ width: '130px', height: 'auto' }} />
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
                            <Button onClick={(e) => handleAnswer(userInput)} className="next-btn" variant="danger">Cancel</Button>
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
            </div> */}
        </div>
    );
}

export default CognitiveExamination;