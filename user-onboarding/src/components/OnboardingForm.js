import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const OnboardingForm = ({ values, errors, touched, status }) => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      if (status) setUsers([...users, status]);
   }, [status])

   return (
      <div className="form-container">
         <Form className="form">
            <Field type="text" name="name" placeholder="name" />
            {touched.name && errors.name && <p className="error">{errors.name}</p>}
            <Field type="email" name="email" placeholder="email" />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            <label>
               <Field type="checkbox" name="tos" checked={values.tos} />
               accept terms of service
            </label>
            <button type="submit">submit</button>
         </Form>
         <div className="user-container">
            {users.map(user => {
               return (
                  <div key={user.id} className="user">
                     <h2>{user.name}</h2>
                     <p>{user.email}</p>
                  </div>
               )
            })}
         </div>
      </div>
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
      name: Yup.string().required("please enter a name"),
      email: Yup.string().required("please enter an email address"),
      password: Yup.string().required("please enter a password")
   }),

   handleSubmit(values, { setStatus }) {
      axios.post('https://reqres.in/api/users', values)
         .then(response => {
            console.log(response);
            setStatus(response.data);
         })
         .catch(error => {
            console.log(error);
         })
   }

})(OnboardingForm);

export default FormikOnboardingForm;
