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
          courseA: string
          courseB: string
        }
        Insert: {
          courseA: string
          courseB: string
        }
        Update: {
          courseA?: string
          courseB?: string
        }
        Relationships: [
          {
            foreignKeyName: "courseEquivalences_courseA_fkey"
            columns: ["courseA"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["courseCode"]
          },
          {
            foreignKeyName: "courseEquivalences_courseB_fkey"
            columns: ["courseB"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["courseCode"]
          },
        ]
      }
      courseRequisites: {
        Row: {
          incoming: string
          requisite: string
          type: string
        }
        Insert: {
          incoming: string
          requisite: string
          type: string
        }
        Update: {
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
            referencedColumns: ["courseCode"]
          },
          {
            foreignKeyName: "courseRequisites_requisite_fkey"
            columns: ["requisite"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["courseCode"]
          },
        ]
      }
      courses: {
        Row: {
          academic: boolean | null
          courseCode: string
          fullName: string | null
          units: number
        }
        Insert: {
          academic?: boolean | null
          courseCode: string
          fullName?: string | null
          units: number
        }
        Update: {
          academic?: boolean | null
          courseCode?: string
          fullName?: string | null
          units?: number
        }
        Relationships: []
      }
      curriculums: {
        Row: {
          courseCode: string
          program: string
        }
        Insert: {
          courseCode: string
          program: string
        }
        Update: {
          courseCode?: string
          program?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculums_courseCode_fkey"
            columns: ["courseCode"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["courseCode"]
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
          classNumber: number
          schedule: number
        }
        Insert: {
          classNumber: number
          schedule: number
        }
        Update: {
          classNumber?: number
          schedule?: number
        }
        Relationships: [
          {
            foreignKeyName: "personalSchedules_schedule_fkey"
            columns: ["schedule"]
            isOneToOne: false
            referencedRelation: "schedules"
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
          term: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          owner: string
          term?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          owner?: string
          term?: number | null
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
          classNumber: number
          courseCode: string
          enrolled: number
          faculty: string | null
          remarks: string | null
          section: string
          term: number
        }
        Insert: {
          capacity: number
          classNumber: number
          courseCode: string
          enrolled: number
          faculty?: string | null
          remarks?: string | null
          section: string
          term: number
        }
        Update: {
          capacity?: number
          classNumber?: number
          courseCode?: string
          enrolled?: number
          faculty?: string | null
          remarks?: string | null
          section?: string
          term?: number
        }
        Relationships: [
          {
            foreignKeyName: "sections_courseCode_fkey"
            columns: ["courseCode"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["courseCode"]
          },
          {
            foreignKeyName: "sections_term_fkey"
            columns: ["term"]
            isOneToOne: false
            referencedRelation: "terms"
            referencedColumns: ["term"]
          },
        ]
      }
      sectionSchedules: {
        Row: {
          classNumber: number
          day: string
          end: number | null
          room: string | null
          start: number | null
          term: number
        }
        Insert: {
          classNumber: number
          day: string
          end?: number | null
          room?: string | null
          start?: number | null
          term: number
        }
        Update: {
          classNumber?: number
          day?: string
          end?: number | null
          room?: string | null
          start?: number | null
          term?: number
        }
        Relationships: [
          {
            foreignKeyName: "sectionSchedules_term_classNumber_fkey"
            columns: ["term", "classNumber"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["term", "classNumber"]
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
          term?: number
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
          displayName: string | null
          idNumber: number
          major: string | null
          minor: string | null
          uid: string
          username: string
        }
        Insert: {
          displayName?: string | null
          idNumber: number
          major?: string | null
          minor?: string | null
          uid: string
          username: string
        }
        Update: {
          displayName?: string | null
          idNumber?: number
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

