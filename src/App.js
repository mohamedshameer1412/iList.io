import React, { useState, useEffect } from 'react';
import TaskInput from './Components/TaskInput';
import TaskNoteList from './Components/TaskNote';
import './App.css'; // Import your CSS file
import Navbar from './Components/Navbar';

function App() {
  const [toDoListArray, setToDoListArray] = useState(() => {
    const storedNotes = localStorage.getItem('toDoListArray');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [listening, setListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [navBg, setNavBg] = useState(false);

  // Update local storage whenever notes are updated
  useEffect(() => {
    localStorage.setItem('toDoListArray', JSON.stringify(toDoListArray));
  }, [toDoListArray]);

  // add task to localStorage
  const addItemToArray = (toDoItem) => {
    const taskId = new Date().toLocaleString() + Math.floor(Math.random() * 100000);
    setToDoListArray((prevArray) => [{ toDoItem, id: taskId, status: "Pending" }, ...prevArray]);
  };
  
  // remove task from localStorage
  const removeItemFromArray = (id) => {
    setToDoListArray((prevArray) =>
      prevArray.filter((item, index) => index !== id)
    );
  };

  // Searchbar - live search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


 //voice synthesis to create and add task  
  const handleToggleListening = () => {
    if (!listening) {
      const recognition = new window.webkitSpeechRecognition(); // Using Webkit Speech Recognition API
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setListening(false);
        addItemToArray(transcript)
        setTimeout(() => {
          setTranscript('')
        }, 2000);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.start();
      setListening(true);
      setSpeechRecognition(recognition);
    } else {
      speechRecognition.stop();
      setListening(false);
    }
  };


  // change navbar background on scroll
  const changeNavBg = () => {
   window.scrollY >= 80 ? setNavBg(true) : setNavBg(false);
  }
  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
    return () => {
      window.removeEventListener('scroll', changeNavBg);
    }
  }, [])

  return (
    <>
      {/* Navbar */}
      <Navbar searchQuery={searchQuery} handleSearch={handleSearch} setSearchQuery={setSearchQuery} tasks={toDoListArray} setTasks={setToDoListArray} navBg={navBg} />

      <div className="container mt-5">
        <div className="row">
          {/* Task Input  */}
          <TaskInput addItem={addItemToArray} />
          {/* Voice Input  */}
          <button className="w-50  mx-auto button" onClick={handleToggleListening}>
            <span>
              {transcript} {listening ? '(Listening...)' : '(Start Listening)'}
            </span>
          </button>

          <div>
            {/* Tasks */}
            <TaskNoteList
              tasks={toDoListArray}
              removeItem={removeItemFromArray}
              searchQuery={searchQuery}
              setTasks={setToDoListArray}
            />
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
