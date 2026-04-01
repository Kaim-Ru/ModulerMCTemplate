export interface EntityObjectInterface {
  format_version?: string;
  id: string;
  name?: string;
  resource?: {
    texture?: string;
    geometry?: string;
    spawn_egg_texture?: string;
  };
  components?: Record<string, unknown>;
}
