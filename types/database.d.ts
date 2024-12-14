export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      courseEquivalences: {
        Row: {
          coursea: string
          courseb: string
          id: number
        }
        Insert: {
          coursea: string
          courseb: string
          id?: number
        }
        Update: {
          coursea?: string
          courseb?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "courseEquivalences_coursea_fkey"
            columns: ["coursea"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_code"]
          },
          {
            foreignKeyName: "courseEquivalences_courseb_fkey"
            columns: ["courseb"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_code"]
          },
        ]
      }
      courseRequisites: {
        Row: {
          id: number
          incoming: string
          requisite: string
          type: string
        }
        Insert: {
          id?: number
          incoming: string
          requisite: string
          type: string
        }
        Update: {
          id?: number
          incoming?: string
          requisite?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "courseRequisites_incoming_fkey"
            columns: ["incoming"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_code"]
          },
          {
            foreignKeyName: "courseRequisites_requisite_fkey"
            columns: ["requisite"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_code"]
          },
        ]
      }
      courses: {
        Row: {
          academic: boolean | null
          course_code: string
          full_name: string | null
          units: number
        }
        Insert: {
          academic?: boolean | null
          course_code: string
          full_name?: string | null
          units: number
        }
        Update: {
          academic?: boolean | null
          course_code?: string
          full_name?: string | null
          units?: number
        }
        Relationships: []
      }
      curriculums: {
        Row: {
          course_code: string
          id: number
          program: string
        }
        Insert: {
          course_code: string
          id?: number
          program: string
        }
        Update: {
          course_code?: string
          id?: number
          program?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculums_course_code_fkey"
            columns: ["course_code"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_code"]
          },
          {
            foreignKeyName: "curriculums_program_fkey"
            columns: ["program"]
            isOneToOne: false
            referencedRelation: "REF_programs"
            referencedColumns: ["name"]
          },
        ]
      }
      personalSchedules: {
        Row: {
          id: number
          schedule: number
          section_id: number
        }
        Insert: {
          id?: number
          schedule: number
          section_id: number
        }
        Update: {
          id?: number
          schedule?: number
          section_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "personalSchedules_schedule_fkey"
            columns: ["schedule"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personalSchedules_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      REF_programs: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          id: number
          name: string | null
          owner: string
          term: number
        }
        Insert: {
          id?: number
          name?: string | null
          owner: string
          term: number
        }
        Update: {
          id?: number
          name?: string | null
          owner?: string
          term?: number
        }
        Relationships: [
          {
            foreignKeyName: "schedules_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "schedules_term_fkey"
            columns: ["term"]
            isOneToOne: false
            referencedRelation: "terms"
            referencedColumns: ["term"]
          },
        ]
      }
      sections: {
        Row: {
          capacity: number
          class_number: number
          course_code: string
          enrolled: number
          faculty: string | null
          id: number
          remarks: string | null
          section: string
          term: number
        }
        Insert: {
          capacity: number
          class_number: number
          course_code: string
          enrolled: number
          faculty?: string | null
          id?: number
          remarks?: string | null
          section: string
          term: number
        }
        Update: {
          capacity?: number
          class_number?: number
          course_code?: string
          enrolled?: number
          faculty?: string | null
          id?: number
          remarks?: string | null
          section?: string
          term?: number
        }
        Relationships: [
          {
            foreignKeyName: "sections_course_code_fkey"
            columns: ["course_code"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_code"]
          },
        ]
      }
      sectionSchedules: {
        Row: {
          day: string | null
          end: string | null
          id: number
          room: string | null
          section_id: number
          start: string | null
        }
        Insert: {
          day?: string | null
          end?: string | null
          id?: number
          room?: string | null
          section_id: number
          start?: string | null
        }
        Update: {
          day?: string | null
          end?: string | null
          id?: number
          room?: string | null
          section_id?: number
          start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sectionSchedules_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      terms: {
        Row: {
          end: string
          start: string
          term: number
        }
        Insert: {
          end: string
          start: string
          term: number
        }
        Update: {
          end?: string
          start?: string
          term?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          display_name: string | null
          id_number: number | null
          major: string | null
          minor: string | null
          uid: string
          username: string
        }
        Insert: {
          display_name?: string | null
          id_number?: number | null
          major?: string | null
          minor?: string | null
          uid: string
          username: string
        }
        Update: {
          display_name?: string | null
          id_number?: number | null
          major?: string | null
          minor?: string | null
          uid?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_major_fkey"
            columns: ["major"]
            isOneToOne: false
            referencedRelation: "REF_programs"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "users_minor_fkey"
            columns: ["minor"]
            isOneToOne: false
            referencedRelation: "REF_programs"
            referencedColumns: ["name"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

