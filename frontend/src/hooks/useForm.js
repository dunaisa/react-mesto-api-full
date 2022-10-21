//Кастомный хук

// import { useState } from 'react';

// export function useForm(inputValues) {
//   const [values, setValues] = useState(inputValues);

//   const handleChange = (event) => {
//     const { value, name } = event.target;
//     setValues({ ...values, [name]: value });
//   };
//   return { values, handleChange, setValues };
// }

// Этот код помещают в отдельный файл useForm.js в папке hooks и импортируют функцию туда, где нужно контролировать инпуты
// И Вам не нужно будет теперь вручную создавать функции обработки инпутов и т д.Все будет в одной строчке кода:

// const { values, handleChange, setValues } = useForm({});