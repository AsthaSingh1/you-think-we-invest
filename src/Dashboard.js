import React, { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
import ThinkingImage from "./assets/Thinking.png";

export default function Dashboard() {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null); // 👈 Speech recognition
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);
  const [messages, setMessages] = useState([]);
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }

        if (finalTranscript.trim()) {
          setInputValue(finalTranscript.trim());
          setTimeout(() => handleSend(finalTranscript.trim()), 500); // 👈 trigger send
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      setRecordedAudioURL(audioUrl);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();

    // 👇 Start speech recognition too
    if (recognitionRef.current) recognitionRef.current.start();

    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop(); // 👈 Stop speech recognition
    setIsRecording(false);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        {
          type: inputType,
          content: URL.createObjectURL(file),
          fileName: file.name,
        },
      ]);
    }
  };

  const handleSend = (overrideText = null) => {
    const textInput = overrideText ?? inputValue;

    if (!textInput && !recordedAudioURL) return;

    const trimmedInput = textInput.trim().toLowerCase();

    const userMessage =
      inputType === "audio"
        ? { type: "audio", content: recordedAudioURL }
        : { type: "text", content: textInput };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setRecordedAudioURL(null);

    if (ideaSubmitted || inputType !== "text") return;

    if (["yes", "einreichen", "submit"].includes(trimmedInput)) {
      const id = Math.floor(100000 + Math.random() * 900000);
      setMessages((prev) => [
        ...prev,
        {
          type: "text",
          content: `Your idea is submitted. Your Idea ID is ${id}.`,
        },
      ]);
      setIdeaSubmitted(true);
      return;
    }

    // Enhance idea response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "text", content: "Enhancing your idea..." },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            type: "text",
            content:
              "🛠️ Here's an enhanced version of your idea to attract users and investors...\n\n[Add full enhancement here]",
          },
          { type: "text", content: "Would you like to submit or enhance further?" },
        ]);
      }, 1000);
    }, 400);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${ThinkingImage})`,
      }}
    >
      <div
        className="w-full max-w-md rounded-lg shadow-xl bg-white bg-opacity-30 backdrop-blur-md overflow-hidden flex flex-col"
        style={{ height: "90vh" }}
      >
        <div className="bg-[#003366] text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">AI Idea Assistant</h2>
          <button onClick={handleLogout} title="Logout">
            <FiLogOut size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="text-sm bg-white p-2 rounded shadow max-h-60 overflow-y-auto whitespace-pre-wrap"
            >
              {msg.type === "text" && <p>{msg.content}</p>}
              {msg.type === "image" && (
                <img
                  src={msg.content}
                  alt={msg.fileName}
                  className="max-h-48 mx-auto"
                />
              )}
              {msg.type === "video" && (
                <video controls src={msg.content} className="max-h-48 mx-auto" />
              )}
              {msg.type === "audio" && (
                <audio controls src={msg.content} className="w-full" />
              )}
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t">
          {inputType === "text" && (
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow border rounded-md px-4 py-2 mr-2 outline-blue-500"
                placeholder="Describe your idea..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                className="bg-blue-600 text-white rounded-full p-2"
              >
                <FaPaperPlane />
              </button>
            </div>
          )}

          {["image", "video"].includes(inputType) && (
            <div className="flex flex-col gap-3 items-center mb-4">
              <input
                type="file"
                accept={inputType + "/*"}
                onChange={handleMediaUpload}
                capture="environment"
                className="text-sm"
              />
              <p className="text-xs text-gray-500">
                {inputType === "image"
                  ? "Choose or take a picture"
                  : "Choose or record a video"}
              </p>
            </div>
          )}

          {inputType === "audio" && (
            <div className="flex flex-col items-center mb-4">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                >
                  🎙 Start Recording
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm"
                >
                  ⏹ Stop Recording
                </button>
              )}
              {recordedAudioURL && (
                <div className="mt-3">
                  <audio controls src={recordedAudioURL} />
                  <button
                    onClick={handleSend}
                    className="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center border-t pt-3 mt-2 text-xs">
            {["text", "image", "audio", "video"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="inputType"
                  value={type}
                  checked={inputType === type}
                  onChange={() => setInputType(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
