import React, { useState } from 'react';
import './Form.css';

const Form = ({ 
  fields,
  onSubmit,
  submitText = 'Submit',
  title = 'Form'
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.pattern && formData[field.name]) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(formData[field.name])) {
          newErrors[field.name] = field.errorMessage || `Invalid ${field.label}`;
        }
      }
      
      if (field.minLength && formData[field.name]?.length < field.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      }
      
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        // Reset form after successful submission
        setFormData({});
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || '',
      onChange: handleChange,
      placeholder: field.placeholder,
      disabled: isSubmitting || field.disabled,
      className: `form-input ${errors[field.name] ? 'input-error' : ''}`
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={field.rows || 4} />;
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] || false}
            onChange={handleChange}
            disabled={isSubmitting || field.disabled}
            className="form-checkbox"
          />
        );
      
      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map(option => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                  disabled={isSubmitting || field.disabled}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      
      default:
        return <input type={field.type || 'text'} {...commonProps} />;
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">{title}</h2>
      
      {fields.map(field => (
        <div key={field.name} className="form-group">
          <label className="form-label">
            {field.label}
            {field.required && <span className="required-star">*</span>}
          </label>
          
          {renderField(field)}
          
          {errors[field.name] && (
            <span className="error-message">{errors[field.name]}</span>
          )}
          
          {field.helpText && (
            <small className="help-text">{field.helpText}</small>
          )}
        </div>
      ))}
      
      <button 
        type="submit" 
        className="form-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : submitText}
      </button>
    </form>
  );
};

export default Form;