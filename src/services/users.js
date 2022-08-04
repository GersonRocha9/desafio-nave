import { gql } from '@apollo/client'
import { format } from 'date-fns'
import { formatDateFromApi, formatIsoString } from 'helpers'
import client from 'providers/fetchClient'

export const getUserById = async ({ queryKey: [key, id] }) => {
  const response = await client.get(`v1/users/${id}`)

  return { ...response, birthdate: formatDateFromApi(response.birthdate) }
}

export const getAllRoles = async () => {
  const { results } = await client.get('v1/roles')
  return results.map(item => ({ label: item.role, value: item.id }))
}

export const getUsers = async params => {
  const { results, pageCount } = await client.get('v1/users', {
    params: { ...params, created_at: params?.created_at ? format(params.created_at, 'yyyy-MM-dd') : null }
  })

  return {
    pageCount,
    results: results.map(user => ({
      ...user,
      formattedCreatedAt: formatIsoString(user.created_at)
    }))
  }
}

export const createUser = ({ birthdate, admission_date, ...data }) =>
  client.post('/v1/navers', {
    ...data,
    birthdate: formatDateFromApi(birthdate),
    admission_date: formatDateFromApi(admission_date)
  })

export const updateUser = (id, { birthdate, admission_date, ...data }) =>
  client.put(`/v1/navers/${id}`, {
    ...data,
    birthdate: formatDateFromApi(birthdate),
    admission_date: formatDateFromApi(admission_date)
  })

export const deleteUser = async id => await client.delete(`/v1/navers/${id}`)

export const getUser = () => client.get('v1/me')

// example of a graphql query
export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
      document
    }
  }
`

//example of rest query using graphql
export const userQuery = gql`
  query getUser {
    me @rest(type: User, path: "/v1/me") {
      id
      name
      email
      document
    }
  }
`

export const login = data => client.post('/v1/users/login', data)
