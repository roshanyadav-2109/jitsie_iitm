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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          id: string
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      board_members: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          designation: string | null
          display_order: number | null
          full_name: string
          id: string
          is_active: boolean
          linkedin_url: string | null
          organization: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          designation?: string | null
          display_order?: number | null
          full_name: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          organization?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          designation?: string | null
          display_order?: number | null
          full_name?: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          organization?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          batch: string | null
          created_at: string
          description: string | null
          founder_id: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          one_liner: string | null
          slug: string
          status: Database["public"]["Enums"]["company_status"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          batch?: string | null
          created_at?: string
          description?: string | null
          founder_id?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          one_liner?: string | null
          slug: string
          status?: Database["public"]["Enums"]["company_status"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          batch?: string | null
          created_at?: string
          description?: string | null
          founder_id?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          one_liner?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["company_status"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          cover_image: string | null
          created_at: string
          date_time: string
          id: string
          location: string | null
          registration_link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          date_time: string
          id?: string
          location?: string | null
          registration_link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          date_time?: string
          id?: string
          location?: string | null
          registration_link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      image_gallery: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean
          title: string | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean
          title?: string | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          apply_link: string | null
          category: string | null
          company_id: string
          created_at: string
          id: string
          location: string | null
          salary_range: string | null
          title: string
          type: Database["public"]["Enums"]["job_type"]
          updated_at: string
        }
        Insert: {
          apply_link?: string | null
          category?: string | null
          company_id: string
          created_at?: string
          id?: string
          location?: string | null
          salary_range?: string | null
          title: string
          type?: Database["public"]["Enums"]["job_type"]
          updated_at?: string
        }
        Update: {
          apply_link?: string | null
          category?: string | null
          company_id?: string
          created_at?: string
          id?: string
          location?: string | null
          salary_range?: string | null
          title?: string
          type?: Database["public"]["Enums"]["job_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      news_updates: {
        Row: {
          created_at: string
          id: string
          link: string | null
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          text: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          text?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          category: Database["public"]["Enums"]["partner_category"]
          created_at: string
          id: string
          logo_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["partner_category"]
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["partner_category"]
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_verified: boolean
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_verified?: boolean
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      startup_advisors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          designation: string | null
          display_order: number | null
          expertise: string | null
          full_name: string
          id: string
          is_active: boolean
          linkedin_url: string | null
          organization: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          designation?: string | null
          display_order?: number | null
          expertise?: string | null
          full_name: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          organization?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          designation?: string | null
          display_order?: number | null
          expertise?: string | null
          full_name?: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          organization?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      startup_openings: {
        Row: {
          apply_link: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          location: string | null
          posted_at: string
          role_title: string
          sector: string | null
          stage: string | null
          startup_name: string
          startup_slug: string | null
          stipend_salary: string | null
          type: string
          updated_at: string
        }
        Insert: {
          apply_link?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          posted_at?: string
          role_title: string
          sector?: string | null
          stage?: string | null
          startup_name: string
          startup_slug?: string | null
          stipend_salary?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          apply_link?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          posted_at?: string
          role_title?: string
          sector?: string | null
          stage?: string | null
          startup_name?: string
          startup_slug?: string | null
          stipend_salary?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
    }
    Enums: {
      app_role: "admin" | "founder" | "user"
      company_status: "active" | "acquired"
      job_type: "intern" | "full_time"
      partner_category: "vc" | "corporate"
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
      app_role: ["admin", "founder", "user"],
      company_status: ["active", "acquired"],
      job_type: ["intern", "full_time"],
      partner_category: ["vc", "corporate"],
    },
  },
} as const
