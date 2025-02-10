export interface DataState {
  uploadedFiles: { filename: string; date: Date; data: { category: string; value: number }[] }[];
  selectedFileData: { category: string; value: number }[] | null;
}
