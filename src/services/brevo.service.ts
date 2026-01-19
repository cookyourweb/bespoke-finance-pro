/**
 * Servicio de integración con Brevo (Sendinblue)
 * Maneja la creación de contactos y registro de leads en Brevo CRM
 */

export interface BrevoContactData {
  nombre: string;
  email: string;
  telefono: string;
  perfil: string;
  modalidad: string;
  status: string;
  timestamp: string;
}

export interface BrevoResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class BrevoService {
  private apiKey: string;
  private listId: string;
  private baseUrl = 'https://api.brevo.com/v3';

  constructor() {
    this.apiKey = import.meta.env.VITE_BREVO_API_KEY || '';
    this.listId = import.meta.env.VITE_BREVO_LIST_ID || '';
  }

  /**
   * Valida que las credenciales de Brevo estén configuradas
   */
  private validateConfig(): boolean {
    if (!this.apiKey || !this.listId) {
      console.warn('⚠️ Brevo API Key o List ID no configurados. Revisa tu archivo .env');
      return false;
    }
    return true;
  }

  /**
   * Crea o actualiza un contacto en Brevo
   * @param contactData - Datos del lead capturado
   * @returns Promise con la respuesta de Brevo
   */
  async createContact(contactData: BrevoContactData): Promise<BrevoResponse> {
    if (!this.validateConfig()) {
      return {
        success: false,
        error: 'Brevo no está configurado correctamente'
      };
    }

    try {
      const payload = {
        email: contactData.email,
        attributes: {
          NOMBRE: contactData.nombre,
          SMS: contactData.telefono.replace(/\s/g, ''), // Eliminar espacios
          PERFIL: contactData.perfil,
          MODALIDAD: contactData.modalidad || 'No especificada',
          STATUS: contactData.status,
          FECHA_REGISTRO: contactData.timestamp
        },
        listIds: [parseInt(this.listId)],
        updateEnabled: true, // Actualizar si el contacto ya existe
        emailBlacklisted: false,
        smsBlacklisted: false
      };

      const response = await fetch(`${this.baseUrl}/contacts`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': this.apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de Brevo:', errorData);

        // Si el contacto ya existe (código 400), lo consideramos éxito
        if (errorData.code === 'duplicate_parameter') {
          console.log('✅ Contacto ya existe en Brevo, actualizado correctamente');
          return { success: true, data: errorData };
        }

        throw new Error(errorData.message || 'Error al crear contacto en Brevo');
      }

      const data = await response.json();
      console.log('✅ Lead registrado en Brevo:', data);

      return { success: true, data };
    } catch (error) {
      console.error('❌ Error al registrar lead en Brevo:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  /**
   * Obtiene la información de un contacto por email
   * @param email - Email del contacto a buscar
   */
  async getContactByEmail(email: string): Promise<BrevoResponse> {
    if (!this.validateConfig()) {
      return {
        success: false,
        error: 'Brevo no está configurado correctamente'
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'api-key': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Contacto no encontrado');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  /**
   * Actualiza el status de un lead en Brevo
   * @param email - Email del contacto
   * @param newStatus - Nuevo status del pipeline
   */
  async updateLeadStatus(
    email: string,
    newStatus: 'nuevo_lead' | 'contactado' | 'interesado' | 'reserva_pendiente' | 'alumno_confirmado'
  ): Promise<BrevoResponse> {
    if (!this.validateConfig()) {
      return {
        success: false,
        error: 'Brevo no está configurado correctamente'
      };
    }

    try {
      const payload = {
        attributes: {
          STATUS: newStatus,
          FECHA_ACTUALIZACION: new Date().toISOString()
        }
      };

      const response = await fetch(`${this.baseUrl}/contacts/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'api-key': this.apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar status');
      }

      console.log(`✅ Status actualizado a: ${newStatus}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Error al actualizar status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }
}

// Exportar instancia singleton
export const brevoService = new BrevoService();
