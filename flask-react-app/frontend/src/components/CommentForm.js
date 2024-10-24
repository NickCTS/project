import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

const CommentForm = ({ onSubmit }) => {
  const { postId } = useParams();  // Get postId from URL

  const initialValues = {
    content: '',
  };

  const validationSchema = Yup.object({
    content: Yup.string().required('Comment is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, post_id: postId }),  // Include postId in the request
    }).then(response => response.json())
      .then(() => {
        setSubmitting(false);
        onSubmit();  // Notify parent component to refresh the list
      });
  };

  return (
    <div>
      <h1>Add Comment</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <label>Comment</label>
          <Field name="content" as="textarea" rows="3" />
          <ErrorMessage name="content" component="div" className="error" />
          
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CommentForm;
