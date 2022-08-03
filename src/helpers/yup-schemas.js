import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório'
  }
})

const emptyStringToNull = (value, originalValue) => {
  if (originalValue === '') {
    return null
  }
  return value
}

const yupShapeWithResolver = shape => yupResolver(yup.object().shape(shape))

export const loginResolver = yupShapeWithResolver({
  email: yup.string().email('Insira um e-mail válido').required(),
  password: yup.string().required()
})

export const userFormResolver = yupShapeWithResolver({
  name: yup.string().min(2, 'Mínimo de 2 caracteres no campo').required(),
  job_role: yup.string().required(),
  birthdate: yup
    .string()
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      'Insira uma data válida no formato XX/XX/XXXX'
    )
    .required(),
  admission_date: yup
    .string()
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      'Insira uma data válida no formato XX/XX/XXXX'
    )
    .required(),
  project: yup.string().required(),
  url: yup.string().url('O campo precisa ser uma URL válida').required()
})
