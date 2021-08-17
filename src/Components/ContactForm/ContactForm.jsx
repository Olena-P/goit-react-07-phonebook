import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { getContacts } from '../../redux/selectors';
import { Form, Input, Label, Button, Name, Number } from './ContactForm.styled';
import { HiUser, HiPhone } from 'react-icons/hi';

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const newContact = () => {
    const includeName = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      [],
    );
    const includeNumber = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      [],
    );

    if (name === '' || number === '') {
      alert('Please enter all fields!');
      return true;
    }

    if (includeName.includes(name)) {
      alert(`${name} is already in contacts`);
      return true;
    } else if (includeNumber.includes(number)) {
      alert(`${number} is already in contacts`);
      return true;
    }
  };

  const handleChangeName = event => {
    setName(event.currentTarget.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    resetName();
    resetNumber();

    if (newContact()) {
      return;
    }

    dispatch(actions.addContact(name, number));
  };

  const resetName = () => {
    setName('');
  };

  const resetNumber = () => {
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label >
        <Name> <HiUser/> Name</Name>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Patricia Manterola"
          onChange={handleChangeName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
      </Label>

      <Label >
        <Number> <HiPhone/> Number</Number>
        <Input
          type="tel"
          name="number"
          value={number}
          placeholder="000-00-00"
          onChange={handleChangeNumber}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        />
      </Label>
      <Button  type="submit">
        Add contact
      </Button>
    </Form>
  );
}

// import { Formik } from "formik";
// import {
//   Form,
//   Input,
//   Label,
//   Button,
//   Error,
//   Name,
//   Number,
// } from "./ContactForm.styled";

// export default function ContactForm({ onSubmit }) {
//   return (
//     <Formik
//       initialValues={{ name: "", number: "" }}
//       validate={(values) => {
//         const errors = {};
//         if (!values.name) {
//           errors.name = "Обязательное поле";
//         } else if (!values.number) {
//           errors.number = "Обязательное поле";
//         } else if (
//           !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(
//             values.name
//           )
//         ) {
//           errors.name =
//             "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.";
//         } else if (
//           !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i.test(
//             values.number
//           )
//         ) {
//           errors.number =
//             "Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +";
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting, resetForm }) => {
//         onSubmit(values);
//         setSubmitting(false);
//         resetForm();
//       }}
//     >
//       {({
//         values,
//         touched,
//         errors,
//         handleChange,
//         handleSubmit,
//         isSubmitting,
//       }) => (
//         <Form onSubmit={handleSubmit} autoComplete="off">
//           <Label>
//             <Name>Name</Name>
//             <Input
//               type="text"
//               name="name"
//               placeholder="Patricia Manterola"
//               onChange={handleChange}
//               value={values.name}
//             />
//             {touched.name && errors.name && <Error>{errors.name}</Error>}
//           </Label>
//           <Label>
//             <Number>Number</Number>
//             <Input
//               type="tel"
//               name="number"
//               placeholder="0669365879"
//               onChange={handleChange}
//               value={values.number}
//             />
//             {touched.number && errors.number && <Error>{errors.number}</Error>}
//           </Label>
//           <Button
//             type="submit"
//             disabled={
//               isSubmitting || values.name === "" || values.number === ""
//             }
//           >
//             Add contacts
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   );
// }
