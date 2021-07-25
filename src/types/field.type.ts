/**
 * The available Field types
 */
export type FieldTypes = "mine" | "default";

export const FIELD: Record<string, FieldTypes> = {
  Mine: "mine",
  Default: "default",
};

/**
 * The properties present within each board field
 *
 * type: The type of field present
 * exposed: Whether the user has exposed the field
 * adjacent: The number of adjacent mines
 */
export interface FieldType {
  type: FieldTypes;
  exposed: boolean;

  adjacent: number;
}
