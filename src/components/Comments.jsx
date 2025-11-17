import { useState, useEffect } from 'react';
import axios from 'axios';

export function Comments({ newsId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');


    async function fetchComments() {
        try {
            setLoading(true);
            const response = await axios.get(`https://169943addf32007d.mokky.dev/comments?newsId=${newsId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        if (newComment.trim() === ''){
            setSubmitMessage('Комментарий не может быть пустым.');
            return;
        }
        setIsSubmitting(true);
        setSubmitMessage('Отправка комментария...');

        try {
            const commentUrl = 'https://169943addf32007d.mokky.dev/comments';
            const commentData = {
                newsId: parseInt(newsId),
                text: newComment,
                date: new Date().toLocaleString(),
            };

            const response = await axios.post(commentUrl, commentData);
            if (response.status === 200 || response.status === 201) {
                setSubmitMessage('Комментарий успешно отправлен!');
                setNewComment('');
                setComments([...comments, response.data]);
            } else {
                setSubmitMessage('Ошибка при отправке комментария. Попробуйте еще раз.');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            setSubmitMessage('Ошибка при отправке комментария. Попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [newsId]);

    return (
        <div className="comments-section">
            <h3 className="comments-section__title">Комментарии</h3>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                    {submitMessage && <div className="comment-form__message">{submitMessage}</div>}
                <textarea
                    className="comment-form__input"
                    placeholder="Написать комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="comment-form__submit-button" type="submit" disabled={isSubmitting} >{isSubmitting ? 'Отправка...' : 'Отправить'}</button>
            </form>
            {loading ? (
                <div>Загрузка комментариев...</div>
            ) : (
                <ul className="comments-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment">
                            <div className="comment__date">{comment.date}</div>
                            <div className="comment__text">{comment.text}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
