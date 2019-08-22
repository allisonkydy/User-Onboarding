import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const OnboardingForm = ({ values, errors, touched }) => {
   return (
      <Form>
         <Field type="text" name="name" placeholder="name" />
         {touched.name && errors.name && <p>{errors.name}</p>}
         <Field type="email" name="email" placeholder="email" />
         {touched.email && errors.email && <p>{errors.email}</p>}
         <Field type="password" name="password" placeholder="password" />
         {touched.password && errors.password && <p>{errors.password}</p>}
         <label>
            <Field type="checkbox" name="tos" checked={values.tos} />
            Accept Terms of Service
         </label>
         <button type="submit">Submit</button>
      </Form>
   );
};

const FormikOnboardingForm = withFormik({
   mapPropsToValues({ name, email, password, tos }) {
      return {
         name: name || "",
         email: email || "", 
         password: password || "",
         tos: tos || false
      }
   },

   validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter a name"),
      email: Yup.string().required("Please enter an email address"),
      password: Yup.string().required("Please enter a password")
   })

})(OnboardingForm);

export default FormikOnboardingForm;
