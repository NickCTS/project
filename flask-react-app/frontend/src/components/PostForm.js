import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PostForm = ({ post, onSubmit }) => {
  const initialValues = post || {
    title: '',
    content: '',
    user_id: 1,  // Set a default user ID for now
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().min(20, 'Content must be at least 20 characters').required('Content is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const url = post ? `http://localhost:5000/posts/${post.id}` : 'http://localhost:5000/posts';
    const method = post ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
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
      <h1>{post ? 'Edit Post' : 'Create New Post'}</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <label>Title</label>
          <Field name="title" />
          <ErrorMessage name="title" component="div" className="error" />
          
          <label>Content</label>
          <Field name="content" as="textarea" rows="5" />
          <ErrorMessage name="content" component="div" className="error" />
          
          <button type="submit">{post ? 'Update' : 'Submit'}</button>
        </Form>
      </Formik>
    </div>
  );
};

export default PostForm;
