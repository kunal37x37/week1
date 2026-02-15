import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Button from './components/Button';
import Form from './components/Form';
import './App.css';

function App() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Product 1', description: 'Amazing product with great features', price: 29.99, rating: 4, imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product 2', description: 'Another awesome item for you', price: 49.99, rating: 5, imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Product 3', description: 'Best seller of the month', price: 19.99, rating: 3, imageUrl: 'https://via.placeholder.com/300' },
  ]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCardButtonClick = (item) => {
    alert(`You clicked on ${item.title}`);
  };

  const handleButtonClick = (e, count) => {
    console.log(`Button clicked ${count} times`);
  };

  const handleFormSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Form submitted successfully!');
  };

  const formFields = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name',
      minLength: 3,
      errorMessage: 'Name must be at least 3 characters'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter your email'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      pattern: '^[0-9]{10}$',
      errorMessage: 'Please enter a valid 10-digit phone number'
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' }
      ]
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Enter your message',
      rows: 4
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox'
    },
    {
      name: 'contactMethod',
      label: 'Preferred Contact Method',
      type: 'radio',
      options: [
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'both', label: 'Both' }
      ]
    }
  ];

  return (
    <div className="app">
      <Header
        title="React Components Demo"
        subtitle="Practice with reusable components"
        logo="https://via.placeholder.com/40"
        navItems={[
          { text: 'Home', link: '#' },
          { text: 'Products', link: '#' },
          { text: 'About', link: '#' },
          { text: 'Contact', link: '#' }
        ]}
        backgroundColor="#e3f2fd"
      />

      <main className="main-content">
        <section className="section">
          <h2>Card Components</h2>
          <div className="cards-grid">
            {cards.map(card => (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                price={card.price}
                rating={card.rating}
                imageUrl={card.imageUrl}
                onButtonClick={handleCardButtonClick}
                buttonText="View Details"
                variant="product"
              />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Button Components</h2>
          <div className="buttons-demo">
            <Button 
              variant="primary" 
              size="small" 
              onClick={handleButtonClick}
              icon="👍"
            >
              Small
            </Button>
            
            <Button 
              variant="success" 
              size="medium" 
              onClick={handleButtonClick}
              icon="✨"
              iconPosition="right"
            >
              Medium
            </Button>
            
            <Button 
              variant="danger" 
              size="large" 
              onClick={handleButtonClick}
              loading={false}
            >
              Large
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleButtonClick}
              disabled
            >
              Disabled
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={handleButtonClick}
              fullWidth
            >
              Full Width
            </Button>
          </div>
        </section>

        <section className="section">
          <h2>Form Component</h2>
          {formSubmitted && (
            <div className="success-message">
              Form was submitted successfully! You can submit again.
            </div>
          )}
          <Form
            title="Contact Form"
            fields={formFields}
            onSubmit={handleFormSubmit}
            submitText="Send Message"
          />
        </section>
      </main>

      <Footer
        companyName="React Components Inc."
        year={2024}
        links={[
          { text: 'Privacy Policy', url: '#' },
          { text: 'Terms of Service', url: '#' },
          { text: 'Contact Us', url: '#' }
        ]}
        socialLinks={[
          { icon: '📘', url: 'https://facebook.com' },
          { icon: '🐦', url: 'https://twitter.com' },
          { icon: '📷', url: 'https://instagram.com' },
          { icon: '💼', url: 'https://linkedin.com' }
        ]}
      />
    </div>
  );
}

export default App;