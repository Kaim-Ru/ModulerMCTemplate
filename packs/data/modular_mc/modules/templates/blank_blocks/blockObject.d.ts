export interface BlockObjectInterface {
  format_version?: string;
  id: string;
  name?: string;
  category?: string;
  group?: string;
  is_hidden_in_commands?: boolean;
  texture?: string;
  geometry?: string;
  components?: Record<string, unknown>;
  render_method?: string;
  map_color?: string;
}
