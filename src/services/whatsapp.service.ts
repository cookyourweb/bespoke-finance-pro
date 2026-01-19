/**
 * Servicio de integración con WhatsApp Business API
 * Maneja el envío de mensajes y redirección a WhatsApp
 */

export interface WhatsAppLead {
  nombre: string;
  telefono: string;
  email: string;
}

class WhatsAppService {
  private phoneNumber: string;
  private apiUrl: string;
  private apiToken: string;

  constructor() {
    this.phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '34600000000';
    this.apiUrl = import.meta.env.VITE_WHATSAPP_API_URL || '';
    this.apiToken = import.meta.env.VITE_WHATSAPP_API_TOKEN || '';
  }

  /**
   * Genera un mensaje pre-rellenado para WhatsApp con información del lead
   * @param lead - Información del lead
   * @returns Mensaje formateado para WhatsApp
   */
  generateInitialMessage(lead: WhatsAppLead): string {
    return `Hola! 👋 Me llamo ${lead.nombre} y estoy interesado/a en el programa de modelización financiera de Bespoke School of Finance.

📧 Email: ${lead.email}
📱 Teléfono: ${lead.telefono}

Me gustaría agendar una llamada para conocer más sobre el programa.`;
  }

  /**
   * Genera URL de WhatsApp Web/App con mensaje pre-rellenado
   * @param lead - Información del lead (opcional)
   * @returns URL de WhatsApp
   */
  getWhatsAppUrl(lead?: WhatsAppLead): string {
    const baseUrl = `https://wa.me/${this.phoneNumber}`;

    if (lead) {
      const message = encodeURIComponent(this.generateInitialMessage(lead));
      return `${baseUrl}?text=${message}`;
    }

    return baseUrl;
  }

  /**
   * Redirige al usuario a WhatsApp con mensaje pre-rellenado
   * @param lead - Información del lead
   */
  redirectToWhatsApp(lead: WhatsAppLead): void {
    const url = this.getWhatsAppUrl(lead);
    window.open(url, '_blank');
  }

  /**
   * Envía un mensaje de notificación al equipo de ventas via WhatsApp Business API
   * (Requiere configuración de WhatsApp Business API)
   * @param lead - Información del lead
   */
  async notifySalesTeam(lead: WhatsAppLead): Promise<boolean> {
    if (!this.apiUrl || !this.apiToken) {
      console.warn('⚠️ WhatsApp Business API no configurada');
      return false;
    }

    try {
      const message = `🚀 *NUEVO LEAD REGISTRADO*

👤 *Nombre:* ${lead.nombre}
📧 *Email:* ${lead.email}
📱 *Teléfono:* ${lead.telefono}
⏰ *Fecha:* ${new Date().toLocaleString('es-ES')}

*Acción requerida:* Contactar al lead para agendar llamada.`;

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`
        },
        body: JSON.stringify({
          to: this.phoneNumber,
          message: message
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar notificación');
      }

      console.log('✅ Notificación enviada al equipo de ventas');
      return true;
    } catch (error) {
      console.error('❌ Error al notificar al equipo:', error);
      return false;
    }
  }

  /**
   * Obtiene el número de WhatsApp configurado
   */
  getPhoneNumber(): string {
    return this.phoneNumber;
  }
}

// Exportar instancia singleton
export const whatsappService = new WhatsAppService();
