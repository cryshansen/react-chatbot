/** use for Get methods of apis that are  no credential endpoints */

export async function requestPublic<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}