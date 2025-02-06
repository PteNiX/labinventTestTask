export interface DataState {
  uploadedFiles: { filename: string; date: Date; data: { category: string; value: number }[] }[];
}
