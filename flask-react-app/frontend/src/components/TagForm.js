import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TagForm = ({ onSubmit }) => {
  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Tag name is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    fetch('http://localhost:5000/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then(response => response.json())
      .then(() => {
        setSubmitting(false);
        onSubmit();  // Notify parent component to refresh the list
      });
  };

  return (
    <div>
      <h1>Create New Tag</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <label>Tag Name</label>
          <Field name="name" />
          <ErrorMessage name="name" component="div" className="error" />
          
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TagForm;
