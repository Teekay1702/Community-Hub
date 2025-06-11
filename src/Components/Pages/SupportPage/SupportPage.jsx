import React, { useState, useEffect } from 'react';
import { Heart, Phone } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Data/firebase';
import { collection, getDocs, setDoc, doc, addDoc, serverTimestamp, arrayUnion, updateDoc } from 'firebase/firestore';
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
	const [error, setError] = useState('');
	const [requests, setRequests] = useState([]);
	const [selectedRequest, setSelectedRequest] = useState(null);
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
			console.log('Support volunteer registered:', { name, email });
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

	const handleSubmitRequest = async () => {
		if (!assistanceMessage.trim()) {
			setError('Please describe your support request.');
			return;
		}

		await addDoc(collection(db, 'supportRequests'), {
			text: assistanceMessage,
			timestamp: serverTimestamp(),
			responders: []
		});

		setAssistanceMessage('');
	};

	useEffect(() => {
		const fetchRequests = async () => {
			const snapshot = await getDocs(collection(db, 'supportRequests'));
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setRequests(data);
		};
		fetchRequests();
	}, []);

	const formatTimeAgo = (date) => {
		const now = new Date();
		const diff = Math.floor((now - date) / 1000); // seconds
		if (diff < 60) return `${diff} seconds ago`;
		if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
		if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
		return `${Math.floor(diff / 86400)} days ago`;
	};

	const formatDate = (date) =>
		date.toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' });

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
				<textarea
					placeholder="Describe what kind of help you need... Our community is here to support you."
					className="textarea"
					value={assistanceMessage}
					onChange={(e) => {
						setAssistanceMessage(e.target.value);
						if (error) setError('');
					}}
				></textarea>

				<button
					className="btn request-help"
					onClick={async () => {
						if (!assistanceMessage.trim()) {
							setError('Please describe your support request.');
							return;
						}

						try {
							await handleSubmitRequest(); // 🔥 Save to Firestore
							navigate('/profile', {
								state: {
									message: `Support Request:\n${assistanceMessage}`
								}
							});
						} catch (err) {
							console.error("Failed to submit support request:", err);
							setError("There was an error submitting your request. Please try again.");
						}
					}}
				>
					Submit request
				</button>


				{error && <p className="error-text">{error}</p>}
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

			{/*Add recent  support requests*/}
			<section className="recent-requests">
				<h3 className="section-title">Recent Support Requests</h3>
				{requests.map((req) => (
					<div
						key={req.id}
						className="request-item clickable"
						onClick={() => setSelectedRequest(req)}
					>
						<p className="request-text">{req.text}</p>
						<p className="request-meta">
							{formatTimeAgo(req.timestamp?.toDate())} • {req.responders?.length || 0} volunteers
						</p>
					</div>
				))}
				{selectedRequest && (
					<div className="modal-overlay">
						<div className="modal-content">
							<h3>{selectedRequest.text}</h3>
							<p>Posted: {formatDate(selectedRequest.timestamp?.toDate())}</p>

							<h4>Responders:</h4>
							<ul>
								{selectedRequest.responders?.map((res, i) => (
									<li key={i}>{res.name} — {formatTimeAgo(new Date(res.time))}</li>
								))}
							</ul>
							<div className="button-row">
								<button
									className="btn btn-help"
									onClick={async () => {
										const docRef = doc(db, 'supportRequests', selectedRequest.id);
										await updateDoc(docRef, {
											responders: arrayUnion({
												name: 'Anonymous Volunteer',
												time: new Date().toISOString()
											})
										});

										navigate('/profile', {
											state: {
												message: `I'd be willing to help with: "${selectedRequest.text}"`
											}
										});
									}}
								>
									I’ll help
								</button>


								<button className="btn btn-cancel" onClick={() => setSelectedRequest(null)}>Close</button>
							</div>
						</div>
					</div>
				)}

			</section>
		</div>
	);
};

export default SupportPage;
