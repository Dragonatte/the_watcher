export interface ActionResult<T> {
  error: string | null;
  items: T[];
  pages: number;
}