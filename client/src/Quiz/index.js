import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from './QuizActions';
import './index.css';
import Question from './question';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getQuestions();
    console.log('Quiz Comp: ' + this.props.questions);
  }

  renderQuestions() {
    // console.log('Render Question' + this.props.questions);
    // return this.props.questions.data.map(question => {
    //   return <Question question={question} post={this.props.postResponse} key={question.id} />;
    // });
    const quest = ['Did you hug?', 'Did you kiss?'];
    // this.props.getQuestions();
    const newQuest = this.props.questions;
    return newQuest.map(question => {
      console.log(question);
      return (
        <div>{question}</div>
      );
    });
  }

  handleFormSubmit(formProps) {
    this.props.postResponse(formProps);
  }

  render() {
    // need to pass id of question answered to post request
    // map over this.props.questions, creating a new Question comp for each
    const {
      fields: { hug, compliment, kiss }, handleSubmit } = this.props;
    return (
      <div>
        {this.renderQuestions()}
      </div>
    );
    return (
      <div className="quiz-box">
        {this.renderQuestions()}
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <label>
            <input type="radio" {...hug} value="yes" checked={hug.value === 'yes'}/> Yes
          </label>
          <label>
            <input type="radio" {...hug} value="no" checked={hug.value === 'no'}/> No
          </label>
          <label>
            <input type="radio" {...compliment} value="yes" checked={compliment.value === 'yes'}/> Yes
          </label>
          <label>
            <input type="radio" {...compliment} value="no" checked={compliment.value === 'no'}/> No
          </label>
          <label>
            <input type="radio" {...kiss} value="yes" checked={kiss.value === 'yes'}/> Yes
          </label>
          <label>
            <input type="radio" {...kiss} value="no" checked={kiss.value === 'no'}/> No
          </label>
          <button action="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// Quiz.PropTypes = {};
// Quiz.defaultProps = {};

const mapStateToProps = state => {
  return { questions: state.quiz.questions };
};

// export default connect(mapStateToProps, actions)(Quiz);

export default reduxForm({
  form: 'answers',
  fields: ['hug', 'compliment', 'kiss'],
}, mapStateToProps, actions)(Quiz);
