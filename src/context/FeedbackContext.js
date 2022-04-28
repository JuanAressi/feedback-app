import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is the item nº 1',
            rating: '1'
        },
        {
            id: 2,
            text: 'This is the item nº 2',
            rating: '2'
        },
        {
            id: 3,
            text: 'This is the item nº 3',
            rating: '3'
        },
        {
            id: 4,
            text: 'This is the item nº 4',
            rating: '4'
        }
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });


    // Add feedback.
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
	}

    // Delete feedback.
    const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((item) => item.id !== id ));
		}
	}

    // Update feedback
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)));
    }

    // Edit feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
}

export default FeedbackContext