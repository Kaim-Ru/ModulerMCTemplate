export interface ItemObjectInterface {
  format_version_item?: string;
  format_version_block?: string;
  id: string;
  name?: string;
  texture?: string;
  geometry?: string;
  category?: string;
  group?: string;
  max_stack_size?: number;
  is_hidden_in_commands?: boolean;
  components_item?: Record<string, unknown>;
  components_block?: Record<string, unknown>;
}
