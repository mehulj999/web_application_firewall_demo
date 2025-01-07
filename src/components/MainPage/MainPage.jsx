
import React from 'react';
import SideBar from '../global/SideBar';
import './MainPage.css';
import PropTypes from 'prop-types';


class CommentArea extends React.Component {
    static propTypes = {
      username: PropTypes.string.isRequired
    };
  
    constructor(props) {
      super(props);
      this.state = {
        comments: [],
        userInput: ''
      };
    }
  
    updateInput = (e) => {
      this.setState({ userInput: e.target.value });
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
  
      if (this.state.userInput) {
        const newComment = {
          username: this.props.username,
          message: this.state.userInput,
          date: new Date()
        };
  
        this.setState((prevState) => ({
          comments: [...prevState.comments, newComment],
          userInput: ''
        }));
      }
    };
  
    render() {
      return (
        <div className="CommentArea" style={{ position: 'relative' }}>
        <h2>Comments</h2>
        <ul className="comment-list">
            {this.state.comments.map((comment, index) => (
                <li class="comment-item">
                <div class="comment-image">
                    <img src="profilepic.jpg" alt="Profile"/>
                    <strong class="comment-username">John Doe</strong>
                </div>
                <div class="comment-content">
                    <p>{comment.message}</p>
                </div>
                <div class="comment-actions">
                    if(comment.username === this.props.username) {
                    <>  
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>   
                    </>
                 }
                </div>
                <div class="comment-date">
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
  
  const MainPage = () => {
    const name = 'John Doe';
  
    return (
      <div className="mainpage-main">
        <SideBar className="mainpage-sidebar" />
        <div style={{ marginLeft: '0px',  flex: 1 }}>
          <CommentArea username={name} />
        </div>
      </div>
    );
  };
  
export default MainPage;