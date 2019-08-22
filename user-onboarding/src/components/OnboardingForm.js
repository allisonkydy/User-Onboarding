import React from 'react';
import { Formik, Form, Field } from 'formik';

function OnboardingForm() {
   return (
      <Formik>
         <Form>
            <Field type="text" name="name" placeholder="name" />
            <Field type="email" name="email" placeholder="email" />
            <Field type="password" name="password" placeholder="password" />
            <Field type="checkbox" name="tos" checked={false} />
            <button>Submit</button>
         </Form>
      </Formik>
   );
}

export default OnboardingForm;
