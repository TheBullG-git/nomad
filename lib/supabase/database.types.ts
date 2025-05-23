export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
          role: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          created_at: string
          updated_at: string
          role?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
          role?: string | null
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          long_description: string | null
          price: number | null
          duration: number
          max_participants: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          long_description?: string | null
          price?: number | null
          duration: number
          max_participants?: number | null
          is_active?: boolean | null
          created_at: string
          updated_at: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          long_description?: string | null
          price?: number | null
          duration?: number
          max_participants?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          payment_method: string
          payment_status: string
          order_status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          payment_method?: string
          payment_status?: string
          order_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          payment_method?: string
          payment_status?: string
          order_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          service_id: string
          quantity: number
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          service_id: string
          quantity?: number
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          service_id?: string
          quantity?: number
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          service_id: string | null
          trainer_id: string | null
          booking_date: string
          start_time: string
          end_time: string
          status: string | null
          participants: number | null
          location: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          trainer_id?: string | null
          booking_date: string
          start_time: string
          end_time: string
          status?: string | null
          participants?: number | null
          location?: string | null
          notes?: string | null
          created_at: string
          updated_at: string
        }
        Update: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          trainer_id?: string | null
          booking_date?: string
          start_time?: string
          end_time?: string
          status?: string | null
          participants?: number | null
          location?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      fitness_stats: {
        Row: {
          id: string
          user_id: string
          date: string
          weight: number | null
          body_fat_percentage: number | null
          muscle_mass: number | null
          resting_heart_rate: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          weight?: number | null
          body_fat_percentage?: number | null
          muscle_mass?: number | null
          resting_heart_rate?: number | null
          notes?: string | null
          created_at: string
          updated_at: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          weight?: number | null
          body_fat_percentage?: number | null
          muscle_mass?: number | null
          resting_heart_rate?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          user_id: string | null
          content: string
          rating: number | null
          is_approved: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          content: string
          rating?: number | null
          is_approved?: boolean | null
          created_at: string
          updated_at: string
        }
        Update: {
          id?: string
          user_id?: string | null
          content?: string
          rating?: number | null
          is_approved?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      workout_sessions: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          trainer_notes: string | null
          user_feedback: string | null
          session_rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          user_id: string
          trainer_notes?: string | null
          user_feedback?: string | null
          session_rating?: number | null
          created_at: string
          updated_at: string
        }
        Update: {
          id?: string
          booking_id?: string
          user_id?: string
          trainer_notes?: string | null
          user_feedback?: string | null
          session_rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      truck_fleet: {
        Row: {
          id: string
          truck_name: string
          license_plate: string
          status: string | null
          last_maintenance_date: string | null
          next_maintenance_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          truck_name: string
          license_plate: string
          status?: string | null
          last_maintenance_date?: string | null
          next_maintenance_date?: string | null
          created_at: string
          updated_at: string
        }
        Update: {
          id?: string
          truck_name?: string
          license_plate?: string
          status?: string | null
          last_maintenance_date?: string | null
          next_maintenance_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      booking_truck_assignments: {
        Row: {
          booking_id: string
          truck_id: string
          assigned_at: string
        }
        Insert: {
          booking_id: string
          truck_id: string
          assigned_at?: string
        }
        Update: {
          booking_id?: string
          truck_id?: string
          assigned_at?: string
        }
      }
      subscription_preferences: {
        Row: {
          booking_id: string
          preference_type: "consistent" | "flexible"
          preferred_time: string | null
        }
        Insert: {
          booking_id: string
          preference_type: "consistent" | "flexible"
          preferred_time?: string | null
        }
        Update: {
          booking_id?: string
          preference_type?: "consistent" | "flexible"
          preferred_time?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      preference_type: ["consistent", "flexible"]
    }
  }
}
