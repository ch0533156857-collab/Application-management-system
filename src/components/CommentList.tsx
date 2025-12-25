//מציגה רשימת תגובות על טיקט +  טופס להוספת תגובה חדשה

import { useState } from "react";
import type { comment } from "../types/Comment";

interface CommentListProps {
    ticketId: number;
    comments: comment[];
    onAddComment: (comment: comment) => Promise<void>;
}

export function CommentList({ ticketId, comments, onAddComment }: CommentListProps) {
    const [newComment, setNewComment] = useState('');
    const[loading, setLoading] = useState(false);


    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!newComment.trim()) return;

        setLoading(true);
        try {
            const commentToSend: comment = {
            id: 0,
            ticket_id: ticketId,
            author_id: 0,
            content: newComment,
            author_name: '',
            author_email: '',
            created_at: ''
            };

            await onAddComment(commentToSend);
            setNewComment('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comments-section graffiti-chat-container" style={{ marginTop: '2.5em' }}>
            <h2 style={{ marginTop: 0, color: 'var(--accent-blue)' }}>💬 Comments</h2>
            {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment, index) => {
                    const isOdd = index % 2 === 0;
                    return (
                    <div 
                        key={comment.id} 
                        className={`comment-item comment-graffiti graffiti-chat-bubble`}
                        style={{
                            background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
                            border: '3px solid ' + (isOdd ? '#3a86ff' : '#8338ec'),
                            borderRadius: isOdd ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
                            padding: '18px 22px',
                            marginLeft: isOdd ? '10px' : '0',
                            marginRight: isOdd ? '0' : '10px',
                            marginTop: '10px',
                            marginBottom: '0',
                            transform: isOdd ? 'rotate(0.5deg)' : 'rotate(-0.5deg)',
                            boxShadow: isOdd 
                                ? '5px 5px 15px rgba(0,0,0,0.8), inset 0 0 20px rgba(58,134,255,0.15)' 
                                : '-5px 5px 15px rgba(0,0,0,0.8), inset 0 0 20px rgba(131,56,236,0.15)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            width: 'auto'
                        }}
                    >
                        <div className="comment-author" style={{ fontWeight: 900, color: '#ff006e', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5em' }}>
                            {comment.author_name} ({comment.author_email})
                        </div>
                        <div className="comment-text" style={{ color: '#ffffff', margin: '0.5em 0', fontWeight: 500 }}>{comment.content}</div>
                        <div className="comment-date" style={{ fontSize: '0.75em', color: 'rgba(255,255,255,0.6)', marginTop: '0.5em', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {new Date(comment.created_at).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </div>
                    </div>
                    );
                })
            ) : (
                <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>No comments yet. Be the first to comment!</p>
            )}
            
            <form onSubmit={handleAddComment} className="form-container" style={{ marginTop: '1.5em' }}>
                <h3>Add Comment</h3>
                <div className="form-group">
                    <label htmlFor="comment-input">Your Comment</label>
                    <textarea
                        id="comment-input"
                        placeholder="Share your thoughts..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{ minHeight: '100px', fontFamily: 'inherit' }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%' }}>
                    {loading ? '⏳ Posting...' : '✓ Post Comment'}
                </button>
            </form>
        </div>
    );
}