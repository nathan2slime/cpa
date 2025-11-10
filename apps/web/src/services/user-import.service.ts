import { api } from '../api'

export class UserImportService {
  static async importUsers(file: File): Promise<void> {
    const formData = new FormData()
    formData.append('file', file)

    await api.post('/user-import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
