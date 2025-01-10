import React, { Component, ChangeEvent, FormEvent } from 'react';
import SideBar from '../SideBar/SideBar';
import './HomePage.css';
import { useAuth } from '../../AuthContext';

// Define the props and state types
interface CommentAreaProps {
  username: string;
  userId: number;
  user: {
    id: number;
    email:string;
    is_admin: boolean;
  }
}

interface Comment {
  id: number;
  user_id: number;
  username: string;
  message: string;
  date: Date;
}

interface CommentAreaState {
  comments: Comment[];
  userInput: string;
  loading: boolean;
  error: string | null;
}

class CommentArea extends Component<CommentAreaProps, CommentAreaState> {
  constructor(props: CommentAreaProps) {
    super(props);
    this.state = {
      comments: [],
      userInput: '',
      loading: true,
      error: null,
    };
  }

  handleDelete = async (commentId: number) => {
    try {
        const response = await fetch(`/posts/${commentId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }

        this.setState((prevState) => ({
            comments: prevState.comments.filter((comment) => comment.id !== commentId),
        }));
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};

handleEdit = async (commentId: number, newContent: string) => {
    try {
        const response = await fetch(`/posts/${commentId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newContent }),
        });

        if (!response.ok) {
            throw new Error('Failed to edit comment');
        }

        this.setState((prevState) => ({
            comments: prevState.comments.map((comment) =>
                comment.id === commentId ? { ...comment, message: newContent } : comment
            ),
        }));
    } catch (error) {
        console.error('Error editing comment:', error);
    }
};

  // Fetch comments from the backend when the component mounts
  async componentDidMount() {
    try {
      const response = await fetch(`/posts`, {
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
  
      const data = await response.json();
      const comments = data.map((post: any) => ({
        id: post.id,
        user_id: post.user_id,
        username: post.username,
        message: post.content,
        date: new Date(post.created_at),
      }));
  
      this.setState({ comments, loading: false });
    } catch (error) {
      console.error('Error fetching comments:', error);
      this.setState({ loading: false, error: 'Failed to load comments' });
  }
  }
  

  updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ userInput: e.target.value });
  };

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (this.state.userInput) {
      const newComment: Comment = {
        id: Date.now(), // Temporary ID until the server assigns one
        user_id: this.props.userId,
        username: this.props.username,
        message: this.state.userInput,
        date: new Date(),
      };

      try {
        const response = await fetch(`/users/${this.props.userId}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            title: 'Comment Post',
            content: newComment.message,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit comment');
        }

        const result = await response.json();

        this.setState((prevState) => ({
          comments: [...prevState.comments, { ...newComment, id: result.post_id, }],
          userInput: '',
        }));
      } catch (error) {
        console.error('Error while submitting comment:', error);
      }
    }
  };

  render() {
    const { comments, userInput, loading, error } = this.state;
    const { user } = this.props;

    return (
        <div className="CommentArea">
            <h2>Comments</h2>

            {loading && <p>Loading comments...</p>}
            {error && <p className="error">{error}</p>}

            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment-image">
                            <img src="profilepic.jpg" alt="Profile" />
                            <strong className="comment-username">{comment.username}</strong>
                        </div>
                        <div className="comment-content">
                            <p>{comment.message}</p>
                        </div>
                        <div className="comment-actions">
                            {user.is_admin || comment.user_id === user.id ? (
                                <>
                                    <button
                                        className="edit-button"
                                        onClick={() => {
                                            const newContent = prompt(
                                                "Edit your comment:",
                                                comment.message
                                            );
                                            if (newContent) {
                                                this.handleEdit(comment.id, newContent);
                                            }
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => this.handleDelete(comment.id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : null}
                        </div>
                        <div className="comment-date">
                            <em>{comment.date.toLocaleString()}</em>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={this.handleSubmit} className="comment-form">
                <input
                    type="text"
                    value={userInput}
                    onChange={this.updateInput}
                    placeholder="Write a comment..."
                />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
  }
}


const HomePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mainpage-main">
      <SideBar />
      <div style={{ marginLeft: '0px', flex: 1 }}>
        {user && ( <CommentArea 
                    username={user.email} userId={user.id} user={user} /> )}
      </div>
    </div>
  );
};

export default HomePage;
