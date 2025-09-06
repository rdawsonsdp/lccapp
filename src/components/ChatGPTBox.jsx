import React, { useState, useEffect } from 'react';

const ChatGPTBox = ({ personAData, personBData, compositeData, savedProfiles, currentProfileName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('curious');
  const [savedConversations, setSavedConversations] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load saved conversations for current profile
  useEffect(() => {
    if (currentProfileName && savedConversations[currentProfileName]) {
      setMessages(savedConversations[currentProfileName]);
    } else if (personAData && personAData.birthCard && messages.length === 0) {
      // Show initial message when birth card is retrieved and no previous messages
      setMessages([{
        id: 1,
        type: 'ai',
        content: "Hi! I'm here to help you understand your love life better. Ask me anything",
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  }, [currentProfileName, personAData, savedConversations]);

  const sentiments = [
    { id: 'curious', label: 'Curious', icon: '🧠' },
    { id: 'concerned', label: 'Concerned', icon: '❤️' },
    { id: 'celebrating', label: 'Celebrating', icon: '⭐' },
    { id: 'supportive', label: 'Supportive', icon: '⭐' }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputMessage, personAData, personBData, compositeData, selectedSentiment),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question, personA, personB, composite, sentiment) => {
    // This is a mock response generator - in real implementation, this would call OpenAI API
    const responses = [
      `Based on your ${personA?.birthCard?.name || 'birth card'} and your love interest's ${personB?.birthCard?.name || 'birth card'}, I can see some fascinating dynamics at play here. Your question about "${question}" touches on something deeper in your relationship pattern.`,
      
      `Ah, the classic ${sentiment} energy! Looking at your composite reading, there's a beautiful tension between your individual cards that creates this unique dynamic. Your ${personA?.birthCard?.name || 'birth card'} energy is calling for something specific here.`,
      
      `You know what's interesting? Your current planetary cycle is highlighting exactly what you're asking about. The cards don't lie - there's a reason this question is coming up now. Your ${personA?.birthCard?.name || 'birth card'} is pushing you toward growth.`,
      
      `I love this question because it shows you're really paying attention to the energetic patterns. Your composite reading reveals something beautiful about how you two complement each other, even when it feels challenging.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSaveConversation = () => {
    if (!currentProfileName) return;
    
    const updatedConversations = {
      ...savedConversations,
      [currentProfileName]: messages
    };
    
    setSavedConversations(updatedConversations);
    
    // Save to localStorage
    localStorage.setItem('chatgpt_conversations', JSON.stringify(updatedConversations));
    
    // Show success feedback
    alert('Conversation saved successfully!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatgpt-container">
      <div className="chatgpt-layout">
        {/* Left Panel - Saved Conversations */}
        <div className="saved-conversations-panel">
          <h3 className="saved-conversations-title">Saved Conversations</h3>
          <div className="saved-conversations-list">
            {Object.keys(savedConversations).length === 0 ? (
              <p className="no-conversations">No conversations saved yet.</p>
            ) : (
              Object.keys(savedConversations).map(profileName => (
                <div 
                  key={profileName}
                  className={`conversation-item ${profileName === currentProfileName ? 'active' : ''}`}
                  onClick={() => {
                    setMessages(savedConversations[profileName]);
                    // In real implementation, you'd switch to that profile
                  }}
                >
                  {profileName}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Chat Interface */}
        <div className="chat-interface">
          <div className="chat-header">
            <h2 className="chat-title">Cardology Guidance Chat</h2>
            <p className="chat-subtitle">Ask questions about your love life, personality, needs, and growth path.</p>
          </div>

          {/* Sentiment Selection */}
          <div className="sentiment-section">
            <p className="sentiment-question">How are you feeling about your question?</p>
            <div className="sentiment-buttons">
              {sentiments.map(sentiment => (
                <button
                  key={sentiment.id}
                  className={`sentiment-button ${selectedSentiment === sentiment.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSentiment(sentiment.id)}
                >
                  <span className="sentiment-icon">{sentiment.icon}</span>
                  {sentiment.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-timestamp">
                  {message.timestamp}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <div className="input-container">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="send-button"
              >
                <span className="send-icon">✈️</span>
              </button>
              <button
                onClick={handleSaveConversation}
                disabled={messages.length === 0}
                className="save-button"
              >
                Save Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTBox;
