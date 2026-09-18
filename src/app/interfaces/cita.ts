export interface Cita {
  _id?: string;
  user: string;       // ID de Mongo del usuario que agenda
  service: string;    // ID de Mongo del servicio elegido
  date: string;        // fecha y hora en formato ISO
  status?: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  notes?: string;
}

// Cuando el backend devuelve las citas con populate(), "user" y "service"
// ya no son solo un ID sino el objeto completo con esos datos:
export interface CitaPoblada {
  _id: string;
  user: { _id: string; name: string; email: string };
  service: { _id: string; name: string; price: number; category: string };
  date: string;
  status: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  notes?: string;
}