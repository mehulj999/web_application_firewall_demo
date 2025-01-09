import React, { Component, ChangeEvent, FormEvent } from 'react';
import SideBar from '../SideBar/SideBar';
import './HomePage.css';
import { useAuth } from '../../AuthContext';

// Define the props and state types
interface CommentAreaProps {
  username: string;
  userId: number;
}

interface Comment {
  username: string;
  message: string;
  date: Date;
}

interface CommentAreaState {
  comments: Comment[];
  userInput: string;
}

class CommentArea extends Component<CommentAreaProps, CommentAreaState> {
  constructor(props: CommentAreaProps) {
    super(props);
    this.state = {
      comments: [],
      userInput: ''
    };
  }

  updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ userInput: e.target.value });
  };

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
  
    if (this.state.userInput) {
      const newComment: Comment = {
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
            title: "Comment Post",
            content: newComment.message,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit comment');
        }
  
        const result = await response.json();
        console.log('Post created successfully:', result);
  
        this.setState((prevState) => ({
          comments: [...prevState.comments, newComment],
          userInput: '',
        }));
      } catch (error) {
        console.error('Error while submitting comment:', error);
      }
    }
  };

  render() {
    return (
      <div className="CommentArea" style={{ position: 'relative' }}>
        <h2>Comments</h2>
        <ul className="comment-list">
          {this.state.comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <div className="comment-image">
                <img src="profilepic.jpg" alt="Profile" />
                <strong className="comment-username">{comment.username}</strong>
              </div>
              <div className="comment-content">
                <p>{comment.message}</p>
              </div>
              <div className="comment-actions">
                {comment.username === this.props.username && (
                  <>
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </>
                )}
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
            value={this.state.userInput}
            onChange={this.updateInput}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    );
  }
}


const HomePage: React.FC = () => {
  const { user, loading } = useAuth();
  const name = 'John Doe';

  return (
    <div className="mainpage-main">
      <SideBar />
      <div style={{ marginLeft: '0px', flex: 1 }}>
      {user && <CommentArea username={user.email} userId={user.id} />}
      </div>
    </div>
  );
};

export default HomePage;
