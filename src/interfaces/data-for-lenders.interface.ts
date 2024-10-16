interface getOptionsData {
  name: string;
  description: string;
  path: string;
}

export interface GetOptionsResponse {
  success: boolean;
  data: getOptionsData[];
}
