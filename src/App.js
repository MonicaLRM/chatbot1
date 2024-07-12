import { EnviarMsg } from './chatbot';
import { useState } from 'react';
import './App.css';

function App() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState([
        { text: "Hola, ayudaré con tus dudas", chatbot: true }
    ]);

    const handleEnviarMsg = async () => {
        try {
            const respuesta = await EnviarMsg(input);
            setResponse([...response, { text: input, chatbot: false }, { text: respuesta, chatbot: true }]);
        } catch (error) {
            console.error("Error enviando el mensaje:", error);
            setResponse([...response, { text: "Hubo un error enviando el mensaje.", chatbot: true }]);
        }
    };

    return (
        <div className="App">
            <input 
                type="text" 
                placeholder="Enter your message" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
            <button onClick={handleEnviarMsg}>Enviar</button>
            <div className="chat">
                {response.map((msg, index) => (
                    <div key={index} className={msg.chatbot ? "chatbot" : "user"}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
