import './CreateContentButton.css';

const CreateContentButton = () => {
    const buttons = [
        { type: 'Text', icon: '✏️' },
        { type: 'Photo', icon: '📷' },
        { type: 'Quote', icon: '💬' },
        { type: 'Link', icon: '🔗' },
        { type: 'Chat', icon: '💬' },
        { type: 'Audio', icon: '🎧' },
        { type: 'Video', icon: '🎥' }
    ];

    return (
        <div className="content-buttons-container">
            {buttons.map((button, index) => (
                <div key={index} className="content-button">
                    <div className="circle">
                        {button.icon}
                    </div>
                    <span className="button-text">{button.type}</span>
                </div>
            ))}
        </div>
    );
};

export default CreateContentButton;
