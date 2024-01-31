import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [formData, setFormData] = useState({
    id: initialValues.id || "",
    title: initialValues.title || "",
    description: initialValues.description || "",
    tags: Array.isArray(initialValues.tags)
      ? initialValues.tags.join(", ")
      : initialValues.tags || "",
    priority: initialValues.priority || "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    tags: false,
    priority: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      tags: !formData.tags.trim(),
      priority: !formData.priority.trim(),
    };

    setErrors(newErrors);

    if (
      !newErrors.title &&
      !newErrors.description &&
      !newErrors.tags &&
      !newErrors.priority
    ) {
      return formData;
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};
