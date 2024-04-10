const API_URL = "http://127.0.0.1:5001/api/";

export type TSymptoms = {
  symptoms: string;
  thread_id: number;
  probability: number;
};

export type TPartSummary = {
  id: number;
  name: string;
  total: number;
};

export type TPartsSummary = {
  category_name: string;
  parts: TPartSummary[];
  total: number;
};

export type TPart = {
  url: string;
  category_name: string;
  similarity: number;
};

export type TSolution = {
  solution: string;
  id: number;
  description: string;
  external_post_id: number;
};

const objectToQueryString = (obj: any) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};

/**
 *
 * @param url
 */
const apiFetch = <T>(url: string): Promise<T> => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
};

/**
 *
 * @param url
 * @param data
 */
const apiPost = <T>(url: string, data: string): Promise<T> => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
};

/**
 * Fetches the symptoms from the API
 * @param model
 * @param version
 * @param chassis
 * @param motor
 * @param problem
 */
const fetchSymptoms = async (
  model: string,
  version: string,
  chassis: string,
  motor: string,
  problem: string
): Promise<TSymptoms[]> => {
  const params = {
    model,
    model_version: version,
    chassis,
    motor,
    prompt: problem,
  };

  return await apiPost<TSymptoms[]>(
    `${API_URL}diagnose`,
    JSON.stringify(params)
  );
};

/**
 *
 * @param threadId
 */
const fetchPartsSummary = async (
  threadId: number
): Promise<TPartsSummary[]> => {
  return await apiFetch<TPartsSummary[]>(
    `${API_URL}/parts_summary/${threadId}`
  );
};

/**
 *
 * @param partId
 */
const fetchParts = async (partId: number): Promise<TPart[]> => {
  return await apiFetch<TPart[]>(`${API_URL}/parts/${partId}`);
};

const fetchSolutions = async (
  threadId: number,
  partNameId: number
): Promise<TSolution[]> => {
  return await apiFetch<TSolution[]>(
    `${API_URL}/solutions/${threadId}/${partNameId}`
  );
};

const fetchSolutionSummary = async (
  modelSummary: string,
  problemDescription: string,
  diagnosticsSummary: string
): Promise<string> => {
  const params = {
    model_summary: modelSummary,
    problem_description: problemDescription,
    diagnostics_summary: diagnosticsSummary,
  };
  return await apiPost<string>(
    `${API_URL}solution_summary`,
    JSON.stringify(params)
  );
};

export {
  fetchSymptoms,
  fetchPartsSummary,
  fetchParts,
  fetchSolutions,
  fetchSolutionSummary,
};
