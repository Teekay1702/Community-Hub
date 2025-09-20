import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Data/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import './VolunteersPage.css';

const VolunteersPage = ({ events }) => {
	const [showForm, setShowForm] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [volunteerCount, setVolunteerCount] = useState(0);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const location = useLocation();

	useEffect(() => {
		const fetchVolunteerCount = async () => {
			try {
				const snapshot = await getDocs(collection(db, 'volunteers'));
				setVolunteerCount(snapshot.size);
			} catch (error) {
				console.error('Failed to fetch volunteers:', error);
			}
		};

		fetchVolunteerCount();
	}, []);

	useEffect(() => {
		const shouldOpen = location.state?.showForm;
		if (shouldOpen) {
			setShowForm(true);
		}
	}, [location.state]);

	const handleVolunteerSignup = async () => {
		setMessage('');
		setMessageType('');
		try {
			await createUserWithEmailAndPassword(auth, email, password);

			await setDoc(doc(db, 'volunteers', email), { name, email, createdAt: new Date() });
			setName('');
			setEmail('');
			setPassword('');
			setShowForm(false);
			setMessage('Volunteer registered successfully!');
			setMessageType('success');

			const snapshot = await getDocs(collection(db, 'volunteers'));
			setVolunteerCount(snapshot.size);

			setTimeout(() => {
				setMessage('');
				setMessageType('');
			}, 4000);
		} catch (error) {
			console.error('Error registering:', error);
			setMessage(error.message);
			setMessageType('error');
			setTimeout(() => {
				setMessageType('');
			}, 4000);
		}
	};

	// Filter upcoming events
	const today = new Date();
	const upcomingEvents = events.filter(event => {
		const eventDate = new Date(event.date);
		return eventDate >= today;
	});

	return (
		<div className="volunteers-page">
			<h1 className="page-title">Ubuntu Volunteers</h1>

			<section className="impact-summary card">
				<h3 className="section-title">Your Ubuntu Impact</h3>
				<div className="impact-grid">
					<div className="impact-item">
						<div className="impact-value orange">
							{volunteerCount}</div>
						<div className="impact-label">Registered Volunteers</div>
					</div>
				</div>
			</section>

			<section className="volunteer-registration card">
				<h3 className="section-title">Want to Become a Volunteer?</h3>

				{
					!showForm ? (
						<>
							<button className="btn-join"
								onClick={
									() => setShowForm(true)
								}>
								Register as a Volunteer
							</button>
							<Link to="/profile" className="btn-request-remove">
								Request to be Removed
							</Link>
						</>
					) : (
						<div className="volunteer-form">
							<input type="name" placeholder="Your name" className="input"
								value={name}
								onChange={
									(e) => setName(e.target.value)
								} />
							<input type="email" placeholder="Your email" className="input"
								value={email}
								onChange={
									(e) => setEmail(e.target.value)
								} />
							<input type="password" placeholder="Create a password" className="input"
								value={password}
								onChange={
									(e) => setPassword(e.target.value)
								} />
							<button className="btn-join"
								onClick={handleVolunteerSignup}>
								Submit Registration
							</button>
							<button className="btn-cancel"
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

			<section className="events-list">
				<h3 className="section-title">Ways to Show Ubuntu Spirit</h3>
				{upcomingEvents.length > 0 ? (
					upcomingEvents.map(event => (
						<div key={event.id} className="event-card card">
							<h4 className="event-title">{event.title}</h4>
							<p className="event-meta">
								{event.location} • {event.date}
							</p>
						</div>
					))
				) : (
					<p>No upcoming events available.</p>
				)}
			</section>
		</div>
	);
};

export default VolunteersPage;
