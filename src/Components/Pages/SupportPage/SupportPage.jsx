import React, { useState, useEffect } from 'react';
import { Heart, Phone } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Data/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import './SupportPage.css';

const SupportPage = () => {
	const [showForm, setShowForm] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [hotlines, setHotlines] = useState([]);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [supportCount, setSupportCount] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [assistanceMessage, setAssistanceMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVolunteerCount = async () => {
			try {
				const snapshot = await getDocs(collection(db, 'support'));
				setSupportCount(snapshot.size);
			} catch (error) {
				console.error('Failed to fetch volunteers:', error);
			}
		};

		fetchVolunteerCount();
	}, []);

	const handleVolunteerSignup = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await setDoc(doc(db, 'support', email), { name, email, createdAt: new Date() });
			setMessage('Support volunteer registered successfully!');
			setMessageType('success');
			setName('');
			setEmail('');
			setPassword('');
			setShowForm(false);
			setTimeout(() => {
				setMessage('');
				setMessageType('');
			}, 4000);
			console.log('Volunteer registered:', { name, email });
		} catch (error) {
			console.error('Error signing up:', error);
			setMessage(error.message);
			setMessageType('error');

			setTimeout(() => {
				setMessage('');
				setMessageType('');
			}, 4000);
		}
	};

	const fetchHotlines = async () => {
		try {
			const response = await fetch('/mentalHealth.json');
			const data = await response.json();
			setHotlines(data);
			setShowModal(true);
		} catch (error) {
			console.error('Failed to load mental health hotlines:', error);
			alert('Could not load support hotline info.');
		}
	};

	return (
		<div className="support-page">
			<h1 className="page-title">Mental Health & Support</h1>

			<section className="impact-summary card">
				<h3 className="section-title">Your Ubuntu Impact</h3>
				<div className="impact-grid">
					<div className="impact-item">
						<div className="impact-value orange">
							{supportCount}</div>
						<div className="impact-label">Registered Volunteers</div>
					</div>
				</div>
			</section>

			<section className="mental-health-support">
				<h3 className="section-title with-icon">
					<Heart className="icon" />
					Free Mental Health Support
				</h3>
				<p className="description">
					Ubuntu spirit includes caring for each other's mental wellbeing. Get free support from trained volunteers.
				</p>
				<div className="button-group">
					<button className="btn call-support"
						onClick={fetchHotlines}>
						<Phone className="btn-icon" />
						Call Support
					</button>
				</div>
			</section>

			{
				showModal && (
					<div className="modal-overlay">
						<div className="modal-content">
							<h2>Available Mental Health Hotlines</h2>
							{
								hotlines.map((hotline, index) => (
									<div className="hotline-card"
										key={index}>
										<h4>{
											hotline.name
										}</h4>
										<p>
											<strong>Phone:</strong>
											{
												hotline.phone
											}</p>
										{
											hotline.sms && <p>
												<strong>SMS:</strong>
												{
													hotline.sms
												}</p>
										}
										<p>
											<strong>Available:</strong>
											{
												hotline.available
											}</p>
										<p>
											<strong>Services:</strong>
											{
												hotline.services.join(', ')
											}</p>
										{
											hotline.website && (
												<p>
													<a href={
														hotline.website
													}
														target="_blank"
														rel="noopener noreferrer">
														Visit Website
													</a>
												</p>
											)
										} </div>
								))
							}
							<button className="btn close-modal"
								onClick={
									() => setShowModal(false)
								}>
								Close
							</button>
						</div>
					</div>
				)
			}

			<section className="ask-assistance">
				<h3 className="section-title">Ask for Assistance</h3>
				<textarea placeholder="Describe what kind of help you need... Our community is here to support you." className="textarea"
					value={assistanceMessage}
					onChange={
						(e) => setAssistanceMessage(e.target.value)
					}></textarea>

				<button className="btn request-help"
					onClick={
						() => {
							if (!assistanceMessage.trim()) {
								alert('Please describe your support request.');
								return;
							}

							navigate('/profile', {
								state: {
									name: 'Community Member',
									email: '',
									message: `Support Request:\n${assistanceMessage}`
								}
							});
						}
					}>
					Submit request
				</button>
			</section>

			<section className="volunteer-support">
				<h3 className="section-title">Volunteer as Mental Health Support</h3>
				<p className="description">
					Help others by offering your time and compassion. Training provided.
				</p>

				{
					!showForm ? (
						<>
							<button className="btn become-volunteer"
								onClick={
									() => setShowForm(true)
								}>
								Register as a Support Volunteer
							</button>
							<Link to="/profile" className="btn-request-remove">
								Request to be Removed
							</Link>
						</>
					) : (
						<div className="volunteer-form">
							<input type="name" placeholder="Your Name" className="input-form"
								value={name}
								onChange={
									(e) => setName(e.target.value)
								} />
							<input type="email" placeholder="Your email" className="input-form"
								value={email}
								onChange={
									(e) => setEmail(e.target.value)
								} />
							<input type="password" placeholder="Create a password" className="input-form"
								value={password}
								onChange={
									(e) => setPassword(e.target.value)
								} />
							<button className="btn-submit-volunteer"
								onClick={handleVolunteerSignup}>
								Submit Registration
							</button>
							<button className="btn become-volunteer"
								onClick={
									() => setShowForm(false)
								}>
								Cancel
							</button>
							<Link to="/profile" className="btn-request-remove">
								Request to be Removed
							</Link>
						</div>
					)
				}
				{
					message && (
						<div className={
							`fade-message ${messageType}`
						}>
							{message} </div>
					)
				} </section>

			<section className="recent-requests">
				<h3 className="section-title">Recent Support Requests</h3>
				<div className="requests-list">
					<div className="request-item border-blue">
						<p className="request-text">Someone in Soweto needs emotional support</p>
						<p className="request-meta">2 hours ago • 3 volunteers responded</p>
					</div>
					<div className="request-item border-green">
						<p className="request-text">Family in Khayelitsha needs guidance</p>
						<p className="request-meta">Yesterday • Resolved</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default SupportPage;
