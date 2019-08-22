import React from 'react';
import { Formik, Form, Field, withFormik } from 'formik';

function OnboardingForm({ values }) {
   return (
      <Formik>
         <Form>
            <Field type="text" name="name" placeholder="name" />
            <Field type="email" name="email" placeholder="email" />
            <Field type="password" name="password" placeholder="password" />
            <label>
               <Field type="checkbox" name="tos" checked={values.tos} />
               Accept Terms of Service
            </label>
            <button>Submit</button>
         </Form>
      </Formik>
   );
}

const FormikOnboardingForm = withFormik({
   mapPropsToValues({ name, email, password, tos }) {
      return {
         name: name || "",
         email: email || "", 
         password: password || "",
         tos: tos || false
      }
   }
})(OnboardingForm)

export default FormikOnboardingForm;
