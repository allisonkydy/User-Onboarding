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
            {touched.name && errors.name && <p className="error">{errors.name}</p>}
            <Field type="text" name="name" placeholder="name" />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
            <Field type="email" name="email" placeholder="email" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            <Field type="password" name="password" placeholder="password" />
            <label htmlFor="gender">
               {touched.gender && errors.gender && <p className="error">{errors.gender}</p>}
               select gender: 
               <Field component="select" name="gender">
                  <option></option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
               </Field>
            </label>
            <label>
               {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
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
                     <p>gender: {user.gender}</p>
                     <p>{user.email}</p>
                  </div>
               )
            })}
         </div>
      </div>
   );
};

const FormikOnboardingForm = withFormik({
   mapPropsToValues({ name, email, password, tos, gender }) {
      return {
         name: name || "",
         email: email || "", 
         password: password || "",
         tos: tos || false,
         gender: gender || undefined
      }
   },

   validationSchema: Yup.object().shape({
      name: Yup.string().required("gotta enter a name"),
      email: Yup.string().required("gotta have email"),
      password: Yup.string().required("gotta enter a password"),
      gender: Yup.string().required("gender cannot be blank"),
      tos: Yup.boolean().oneOf([true], "gotta check it bud")
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
