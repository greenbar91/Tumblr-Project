import './CreateContentButton.css';
import { FaPencil } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import { FaCameraRetro } from "react-icons/fa";
import { useState } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreatePostFormModal from '../CreatePostFormModal';

const CreateContentButton = () => {
    const [showButtons, setShowButtons] = useState(false);

    const handleButtonClick = () => {
        setShowButtons(!showButtons);
    };

    const buttons = [
        { type: 'Photo', icon: <FaCameraRetro /> },
        // { type: 'Quote', icon: '💬' },
        // { type: 'Link', icon: '🔗' },
        // { type: 'Chat', icon: '💬' },
        // { type: 'Audio', icon: '🎧' },
        // { type: 'Video', icon: '🎥' }
    ];

    return (
        <div className="create-content-button-container">
            <button onClick={handleButtonClick} className="main-button">
                <FaPencil /> Create
            </button>

            {showButtons && (
                <div className="content-buttons-container">

                    <div className="content-button">
                        <OpenModalMenuItem
                            itemText={<div className="circle"><IoText /></div>}
                            modalComponent={<CreatePostFormModal />}
                        />
                        <span className="button-text">Text</span>
                    </div>

                    {buttons.map((button, index) => (
                        <div key={index} className="content-button">
                            <div className={`circle ${button.colorClass}`}>
                                {button.icon}
                            </div>
                            <span className="button-text">{button.type}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreateContentButton;
