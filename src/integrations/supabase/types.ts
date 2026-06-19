export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      lead_proposals: {
        Row: {
          created_at: string
          decided_at: string | null
          id: string
          lead_id: string
          observacoes: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["proposal_status"]
          titulo: string
          updated_at: string
          valor_total: number
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          id?: string
          lead_id: string
          observacoes?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["proposal_status"]
          titulo?: string
          updated_at?: string
          valor_total?: number
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          id?: string
          lead_id?: string
          observacoes?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["proposal_status"]
          titulo?: string
          updated_at?: string
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "lead_proposals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          analise_ai: string | null
          anotacoes: string | null
          cnpj: string | null
          created_at: string
          desafios_reais: string | null
          diagnostico_ai: string | null
          execucao_notas: string | null
          id: string
          nome: string
          objetivos_organizacionais: string | null
          oportunidades: Json
          plano_acoes: Json
          resultados_metricas: Json
          resultados_notas: string | null
          solucoes_prestadas: string | null
          stage: Database["public"]["Enums"]["lead_stage"]
          tipo_negocio: string | null
          updated_at: string
          whatsapp: string
        }
        Insert: {
          analise_ai?: string | null
          anotacoes?: string | null
          cnpj?: string | null
          created_at?: string
          desafios_reais?: string | null
          diagnostico_ai?: string | null
          execucao_notas?: string | null
          id?: string
          nome: string
          objetivos_organizacionais?: string | null
          oportunidades?: Json
          plano_acoes?: Json
          resultados_metricas?: Json
          resultados_notas?: string | null
          solucoes_prestadas?: string | null
          stage?: Database["public"]["Enums"]["lead_stage"]
          tipo_negocio?: string | null
          updated_at?: string
          whatsapp: string
        }
        Update: {
          analise_ai?: string | null
          anotacoes?: string | null
          cnpj?: string | null
          created_at?: string
          desafios_reais?: string | null
          diagnostico_ai?: string | null
          execucao_notas?: string | null
          id?: string
          nome?: string
          objetivos_organizacionais?: string | null
          oportunidades?: Json
          plano_acoes?: Json
          resultados_metricas?: Json
          resultados_notas?: string | null
          solucoes_prestadas?: string | null
          stage?: Database["public"]["Enums"]["lead_stage"]
          tipo_negocio?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      proposal_items: {
        Row: {
          created_at: string
          data_entrega_prevista: string | null
          data_entrega_real: string | null
          data_inicio: string | null
          descricao: string | null
          entregaveis: Json
          forma_pagamento: Database["public"]["Enums"]["payment_method"] | null
          id: string
          nome: string
          ordem: number
          parcelas: number | null
          prazo_dias: number | null
          proposal_id: string
          service_catalog_id: string | null
          status: Database["public"]["Enums"]["proposal_item_status"]
          updated_at: string
          valor: number
        }
        Insert: {
          created_at?: string
          data_entrega_prevista?: string | null
          data_entrega_real?: string | null
          data_inicio?: string | null
          descricao?: string | null
          entregaveis?: Json
          forma_pagamento?: Database["public"]["Enums"]["payment_method"] | null
          id?: string
          nome: string
          ordem?: number
          parcelas?: number | null
          prazo_dias?: number | null
          proposal_id: string
          service_catalog_id?: string | null
          status?: Database["public"]["Enums"]["proposal_item_status"]
          updated_at?: string
          valor?: number
        }
        Update: {
          created_at?: string
          data_entrega_prevista?: string | null
          data_entrega_real?: string | null
          data_inicio?: string | null
          descricao?: string | null
          entregaveis?: Json
          forma_pagamento?: Database["public"]["Enums"]["payment_method"] | null
          id?: string
          nome?: string
          ordem?: number
          parcelas?: number | null
          prazo_dias?: number | null
          proposal_id?: string
          service_catalog_id?: string | null
          status?: Database["public"]["Enums"]["proposal_item_status"]
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "proposal_items_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "lead_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_items_service_catalog_id_fkey"
            columns: ["service_catalog_id"]
            isOneToOne: false
            referencedRelation: "services_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      services_catalog: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          entregaveis: Json
          forma_pagamento_padrao:
            | Database["public"]["Enums"]["payment_method"]
            | null
          id: string
          nome: string
          parcelas_padrao: number | null
          prazo_dias: number | null
          scripts_whatsapp: Json
          updated_at: string
          valor_padrao: number | null
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          entregaveis?: Json
          forma_pagamento_padrao?:
            | Database["public"]["Enums"]["payment_method"]
            | null
          id?: string
          nome: string
          parcelas_padrao?: number | null
          prazo_dias?: number | null
          scripts_whatsapp?: Json
          updated_at?: string
          valor_padrao?: number | null
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          entregaveis?: Json
          forma_pagamento_padrao?:
            | Database["public"]["Enums"]["payment_method"]
            | null
          id?: string
          nome?: string
          parcelas_padrao?: number | null
          prazo_dias?: number | null
          scripts_whatsapp?: Json
          updated_at?: string
          valor_padrao?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_team_member: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "member"
      lead_stage:
        | "diagnostico"
        | "analise"
        | "estrategia"
        | "execucao"
        | "resultados"
      payment_method:
        | "a_vista"
        | "parcelado"
        | "recorrente_mensal"
        | "recorrente_anual"
        | "permuta"
        | "outro"
      proposal_item_status:
        | "proposto"
        | "aprovado"
        | "em_execucao"
        | "entregue"
        | "cancelado"
      proposal_status: "rascunho" | "enviada" | "aceita" | "recusada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member"],
      lead_stage: [
        "diagnostico",
        "analise",
        "estrategia",
        "execucao",
        "resultados",
      ],
      payment_method: [
        "a_vista",
        "parcelado",
        "recorrente_mensal",
        "recorrente_anual",
        "permuta",
        "outro",
      ],
      proposal_item_status: [
        "proposto",
        "aprovado",
        "em_execucao",
        "entregue",
        "cancelado",
      ],
      proposal_status: ["rascunho", "enviada", "aceita", "recusada"],
    },
  },
} as const
