import React, { Component } from 'react';
import axios from 'axios';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Trigger from '../compound/compound-trigger.component';
import Controller from '../compound/compound-controller.component';
import DropList from '../dropdown/drop-list.component';

import './update-collection.styles.scss';

class AddProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productID: '',
			name: '',
			price: '',
			quantity: '',
			category: '',
			description: '',
			features: '',
			images: null
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const form = this.state;
		let formData = new FormData();
		Object.keys(form).forEach(key => {
			if (key !== 'images') formData.append(key, form[key])
		})
		// productID
		form.images.forEach(image => formData.append('images', image))
		axios({
			url: 'update-collection',
			method: 'POST',
			headers: { 'content-type': 'multipart/form-data' },
			data: formData
		}).then(res => {
			console.log('response here', res)
			// this.setState({ 
			// 	fullName: '',
			// 	email: '',
			// 	subject: '',
			// 	message: ''
			// })
		}).catch(err => {
			console.log(err)
		});
	}

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value});
	}

	categorySelect = category => {
		this.setState({ category })
	}

	handleChangeFile = e => {
		let { images } = this.state;
		const files = e.target.files;
		let fileArray = [];
		for (let i = 0; i < files.length; i++) {
			fileArray.push(files[i])
		}
		images = images ? images.concat(fileArray) : fileArray
		this.setState({ images })
	}

	removeImage = index => {
		const { images } = this.state;
		images.splice(index, 1);
		this.setState({ images })
	}

	render() {
		const { 
			name, 
			price, 
			quantity, 
			category, 
			description, 
			features,
			images
		} = this.state;
		const categoryList = ['shorts', 'shirts', 'trousers', 'jackets', 'accessories'];

		return (
			<div className='update-collection'>
				<form onSubmit={this.handleSubmit}>
					<div className='panels'>
						<div className='panel'>
							<FormInput 
								name='name' 
								type='text' 
								value={name} 
								label='Product Display Name'
								handleChange={this.handleChange}
								required 
							/>
							<Controller>
								<Trigger>
									<div>
										<FormInput 
											disabled
											value={category} 
											label='Category'
										/>
									</div>
								</Trigger>
								<DropList
									list={categoryList} 
									handleSelection={this.categorySelect}
								/>
							</Controller>
							<FormInput 
								name='price' 
								type='text' 
								value={price} 
								label='Price'
								handleChange={this.handleChange}
							/>
							<FormInput 
								name='quantity' 
								type='text' 
								value={quantity} 
								label='Quantity in Stock'
								handleChange={this.handleChange}
								required 
							/>
							<FormInput 
								name='features' 
								type='text' 
								value={features} 
								label='Product Features'
								handleChange={this.handleChange}
							/>
							<FormInput 
								area
								name='description' 
								type='text' 
								value={description} 
								label='Product Description'
								handleChange={this.handleChange}
							/>
						</div>
						<div className='panel image-panel'>
							<span className='image-header'>
								Add or Remove Images
							</span>
							<input 
								className='input-file'
								type='file' 
								accept='image/png, image/jpeg'
								multiple='multiple' 
								name='image'
								id='upload' 
								onChange={this.handleChangeFile} 
							/>
							<label for='upload'>Choose Images</label>
							<div className='image-collection'>
								{
									images &&
									images.map((image, i) => (
										<div className='image' key={i}>
											<img 
												src={URL.createObjectURL(image)}
												alt={image.name}
											/>
											<span className='img-label'>{image.name}</span>
											<div 
												className='x'
												onClick={()=>this.removeImage(i)}
											>
												<span>&#10005;</span>
											</div>
										</div>
									))
								}
							</div>
						</div>
					</div>
					<div className='buttons'>
						<CustomButton type='submit'> Submit </CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default AddProduct;