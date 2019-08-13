import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const mapDispatchToProps = dispatch => ({
	signUpStart: userDetails => dispatch(signUpStart(userDetails))
})

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		const { signUpStart } = this.props;
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}
		
		signUpStart({displayName, email, password})
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value});
	}

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className='sign-up'>
				<h2>I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput 
						name='displayName' 
						type='text' 
						value={displayName} 
						label='display name'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						name='email' 
						type='email' 
						value={email} 
						label='email'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						name='password' 
						type='password' 
						value={password} 
						label='password'
						handleChange={this.handleChange}
						required 
					/>
					<FormInput 
						name='confirmPassword' 
						type='password' 
						value={confirmPassword} 
						label='confirm password'
						handleChange={this.handleChange}
						required 
					/>
					<div className='btn-container'>
						<CustomButton type='submit'> Sign Up </CustomButton>
						<Link to='/privacy-policy'> Privacy Policy </Link>
					</div>
				</form>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(SignUp);