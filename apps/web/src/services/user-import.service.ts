import { api } from '../api'

export const importUsersService = async (
  file: File,
  deleteExistingUsers: boolean,
) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await api.post<void>(
    `/api/user-import?deleteExistingUsers=${deleteExistingUsers}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return res.data
}
