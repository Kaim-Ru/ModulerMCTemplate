export interface EntityObjectInterface {
  format_version?: string;
  id: string;
  name?: string;
  is_spawnable?: boolean;
  is_summonable?: boolean;
  is_experimental?: boolean;
  resource?: {
    texture?: string;
    geometry?: string;
    spawn_egg_texture?: string;
  };
  components?: Record<string, unknown>;
}
