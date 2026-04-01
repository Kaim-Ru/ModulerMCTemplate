export interface ItemObjectInterface {
  format_version?: string;
  id: string;
  name?: string;
  texture?: string;
  category?: string;
  group?: string;
  max_stack_size?: number;
  is_hidden_in_commands?: boolean;
  components?: Record<string, unknown>;
}
