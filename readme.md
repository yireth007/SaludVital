## 1. KPIs de Negocio
Buscan medir cómo la plataforma impacta la rentabilidad de la clínica, la optimización de recursos y la reducción de la sobrecarga del canal telefónico tradicional.

### 1.1 Tasa de Ausentismo Médico
* **Definición:** Mide la proporción de citas médicas programadas que finalmente quedan vacías debido a que el paciente no asiste o no cancela con la debida anticipación.
* **Meta:** Menos del **8%** de inasistencias generales.
* **Análisis de Desviaciones:** Si este indicador se mantiene alto, significa que los recordatorios automáticos no están capturando la atención del paciente o que los canales elegidos para la notificación están siendo ignorados.
* **Toma de Decisiones:** Implementar recordatorios dinámicos con botones de cancelación en un solo clic y establecer políticas de restricción temporal en la web para usuarios con reincidencia en inasistencias.

### 1.2 Costo Operativo por Asignación de Cita
* **Definición:** Evalúa el costo financiero directo asociado a la gestión de agendamiento, comparando el gasto de los operadores telefónicos contra el costo automatizado del servidor.
* **Meta:** Reducción del **40%** en costos de telefonía y soporte de línea de atención.
* **Análisis de Desviaciones:** Un costo estancado indica que la población de pacientes sigue prefiriendo el teléfono por desconfianza o desconocimiento del sistema digital.
* **Toma de Decisiones:** Lanzar campañas de alfabetización digital directamente en las salas de espera de la clínica utilizando códigos QR y tótems autoasistidos.

### 1.3 Tasa de Conversión de Nuevos Pacientes
* **Definición:** Porcentaje de visitantes únicos del sitio web que completan exitosamente el registro de su primera cita, convirtiéndose en clientes activos de la clínica.
* **Meta:** Mayor al **15%** de los visitantes totales del sitio.
* **Análisis de Desviaciones:** Un porcentaje bajo refleja que la página de inicio no inspira confianza o que el proceso de selección inicial es confuso para usuarios nuevos.
* **Toma de Decisiones:** Optimizar los textos de la página principal (Copywriting) y añadir testimonios o acreditaciones médicas visibles para dar seguridad al usuario.

### 1.4 Capacidad de Agenda Liberada y Reasignada
* **Definición:** Capacidad del sistema para detectar una cancelación a tiempo y poner inmediatamente ese espacio a disposición de otro paciente en lista de espera.
* **Meta:** Reasignación exitosa del **70%** de las citas canceladas.
* **Análisis de Desviaciones:** Una baja reasignación denota que el sistema no actualiza los huecos vacíos con la velocidad necesaria para que otros usuarios los aprovechen.
* **Toma de Decisiones:** Desarrollar un sistema de alertas o "lista de espera virtual" que notifique automáticamente por canales rápidos cuando se libere un turno solicitado.

### 1.5 Retorno de la Inversión (ROI) del Software
* **Definición:** Medición del beneficio económico neto obtenido por la implementación de la plataforma en relación con los costos totales de su desarrollo y mantenimiento.
* **Meta:** Mayor al **25%** de retorno financiero al cumplir el primer año.
* **Análisis de Desviaciones:** Un retorno bajo o negativo alerta sobre un sobrecosto en el desarrollo de software o un volumen de uso web insuficientemente bajo.
* **Toma de Decisiones:** Congelar el desarrollo de módulos secundarios y concentrar los recursos de ingeniería en la estabilización y promoción del flujo principal de agendamiento.

---

## 2. KPIs Técnicos
Garantizan que la infraestructura tecnológica sea sólida, segura y capaz de soportar la demanda operativa sin interrupciones.

### 2.1 Disponibilidad del Sistema
* **Definición:** El porcentaje de tiempo total en el mes durante el cual la plataforma web se encuentra en pleno funcionamiento y accesible para los usuarios.
* **Meta:** Igual o mayor al **99.9%** del tiempo mensual.
* **Análisis de Desviaciones:** Caídas repetidas dañan severamente la reputación de la clínica y obligan a los pacientes a regresar inmediatamente al saturado canal telefónico.
* **Toma de Decisiones:** Migrar la arquitectura a servidores con alta disponibilidad en la nube y configurar sistemas de réplica automatizada ante fallos catastróficos.

### 2.2 Tiempo de Respuesta del Servidor
* **Definición:** Tiempo transcurrido desde que el paciente realiza una acción en la pantalla hasta que el servidor procesa la solicitud y envía el primer byte de respuesta.
* **Meta:** Menos de **300ms**.
* **Análisis de Desviaciones:** Tiempos lentos generan una percepción de que la página está rota, provocando recargas innecesarias y abandono del proceso.
* **Toma de Decisiones:** Implementar redes de distribución de contenido, optimizar el código del backend y activar políticas agresivas de almacenamiento en caché.

### 2.3 Tasa de Error en Peticiones HTTP
* **Definición:** Proporción de solicitudes de los usuarios que terminan en códigos de error del servidor o fallos de comunicación de la plataforma.
* **Meta:** Menos del **0.5%** de las peticiones totales.
* **Análisis de Desviaciones:** Un incremento en este indicador es síntoma directo de bugs en el código, caídas de microservicios o saturación en las bases de datos.
* **Toma de Decisiones:** Implementar herramientas de monitoreo en tiempo real para alertar al equipo de ingeniería al primer indicio de excepciones de software.

### 2.4 Concurrencia de Usuarios Soportada
* **Definición:** Capacidad de la infraestructura para atender de manera simultánea a múltiples usuarios realizando operaciones de agendamiento sin degradar la velocidad.
* **Meta:** Soporte mínimo de **500 usuarios concurrentes** sin pérdida de rendimiento.
* **Análisis de Desviaciones:** Lentitud extrema o bloqueos en horas pico de la mañana indican que el servidor no tiene la capacidad de procesamiento requerida.
* **Toma de Decisiones:** Configurar un esquema de escalado horizontal automático que aumente la capacidad de los servidores en función de la demanda instantánea.

### 2.5 Tiempo de Sincronización de Agenda Médica
* **Definición:** Periodo requerido para que un espacio reservado por un paciente en la web quede bloqueado para el resto del mundo en los sistemas de la clínica.
* **Meta:** Menos de **2 segundos** (Tiempo Real).
* **Análisis de Desviaciones:** Una sincronización lenta da lugar a "citas duplicadas", donde dos pacientes reservan exactamente el mismo horario con el mismo médico.
* **Toma de Decisiones:** Utilizar conexiones persistentes y transacciones de base de datos con bloqueos optimistas para asegurar la consistencia absoluta de los datos.

---

## 3. KPIs Funcionales
Miden si las características diseñadas en el sistema cumplen con su cometido operativo de forma fluida y sin obstáculos lógicos.

### 3.1 Efectividad del Registro de Pacientes
* **Definición:** Evalúa el porcentaje de usuarios que, tras iniciar la creación de su cuenta digital, logran completarla satisfactoriamente sin abandonar el proceso.
* **Meta:** Mayor al **85%** de formularios completados.
* **Análisis de Desviaciones:** Registros bajos delatan que el formulario solicita demasiados datos irrelevantes, es confuso o presenta fallas en las validaciones de identidad.
* **Toma de Decisiones:** Recortar el formulario inicial al mínimo estricto y habilitar inicios de sesión rápidos mediante cuentas externas verificadas.

### 3.2 Tasa de Éxito en Agendamiento Digital
* **Definición:** Relación entre el número de procesos de búsqueda que culminan en una cita agendada frente al total de intenciones de reserva iniciadas.
* **Meta:** Mayor al **90%** de los intentos iniciados.
* **Análisis de Desviaciones:** Un porcentaje bajo indica trabas funcionales en el último tramo del proceso, como problemas para seleccionar la especialidad o fallos en el botón de confirmación.
* **Toma de Decisiones:** Auditar el flujo interactivo y remover cualquier paso intermedio innecesario entre la selección del horario y el guardado final.

### 3.3 Efectividad de Entrega de Recordatorios Automáticos
* **Definición:** Certeza de que el sistema despacha y entrega correctamente las alertas de las citas a través de los canales digitales configurados.
* **Meta:** Mayor al **98%** de entregas exitosas.
* **Análisis de Desviaciones:** Fallos en la entrega suelen deberse a problemas con proveedores de mensajería externa, correos rebotados o números telefónicos mal formateados.
* **Toma de Decisiones:** Integrar pasarelas de comunicación con mejor reputación de entrega e implementar validadores automáticos de formato en los campos de contacto.

### 3.4 Tasa de Uso de la Función "Reprogramar"
* **Definición:** Medida de cuántas modificaciones de fecha u hora se hacen de forma autónoma por la web, frente a las que siguen ingresando por el centro de atención telefónica.
* **Meta:** Mayor al **60%** de las modificaciones gestionadas vía web.
* **Análisis de Desviaciones:** Si el paciente prefiere llamar para cambiar su cita, significa que la opción web está oculta o el proceso para modificarla es demasiado complejo.
* **Toma de Decisiones:** Añadir un enlace directo de "Modificar fecha" en el mismo correo de confirmación de la cita, enviando al usuario directo a la herramienta sin pasos extra.

### 3.5 Tiempo Promedio de Autogestión de Cita
* **Definición:** El tiempo promedio cronometrado que le toma a un usuario encontrar a su médico de preferencia y asegurar su cita en la plataforma.
* **Meta:** Menos de **3 minutos** en total.
* **Análisis de Desviaciones:** Un tiempo elevado apunta a que los motores de búsqueda internos o los filtros por especialidad y cobertura médica son deficientes.
* **Toma de Decisiones:** Rediseñar la interfaz de búsqueda implementando un buscador inteligente predictivo que complete los nombres de médicos y especialidades al escribir.

---

## 4. KPIs de Experiencia de Usuario
Se enfocan en medir la calidad percibida, la facilidad de uso y el nivel de satisfacción de los pacientes con el ecosistema digital.

### 4.1 Net Promoter Score (NPS) de la Plataforma
* **Definición:** Indicador estandarizado que mide la lealtad y disposición del paciente a recomendar la plataforma web a familiares o conocidos tras haberla utilizado.
* **Meta:** Puntuación mayor a **+50 puntos** (Nivel Excelente).
* **Análisis de Desviaciones:** Un puntaje bajo o negativo indica que el sistema generó frustración o estrés en lugar de solucionar el problema de espera.
* **Toma de Decisiones:** Analizar detalladamente los comentarios dejados por los usuarios insatisfechos ("detractores") para corregir los dolores específicos reportados.

### 4.2 Escala de Esfuerzo del Cliente
* **Definición:** Evaluación directa donde el usuario califica el nivel de facilidad general que experimentó al realizar su trámite médico dentro del sitio.
* **Meta:** Calificación promedio mínima de **4.3 de 5 estrellas**.
* **Análisis de Desviaciones:** Si el esfuerzo percibido es alto, la navegación rompe con las convenciones intuitivas del diseño web moderno, confundiendo al paciente.
* **Toma de Decisiones:** Simplificar visualmente las interfaces, aumentar los contrastes de color y expandir los tamaños de los botones para facilitar la interacción de pacientes mayores.

### 4.3 Tasa de Abandono en la Pantalla de Confirmación
* **Definición:** Porcentaje de usuarios que completan toda la búsqueda y selección de la cita médica, pero cierran la página justo en el paso final de confirmación.
* **Meta:** Menos del **10%** de abandono en este paso.
* **Análisis de Desviaciones:** Ocurre cuando la pantalla final despliega términos y condiciones excesivos, advertencias confusas o tarda demasiado en cargar el botón decisivo.
* **Toma de Decisiones:** Rediseñar la pantalla de confirmación eliminando distractores visuales y transformando el texto en un mensaje claro, directo y transparente.

### 4.4 Tasa de Retención y Recurrencia Digital
* **Definición:** Proporción de pacientes que, habiendo usado la plataforma web una vez, eligen de forma voluntaria volver a utilizarla para sus posteriores necesidades médicas.
* **Meta:** Mayor al **80%** de retención de usuarios recurrentes.
* **Análisis de Desviaciones:** Si los pacientes regresan al canal telefónico en su segunda cita, la primera experiencia digital no fue lo suficientemente satisfactoria o confiable.
* **Toma de Decisiones:** Ofrecer incentivos digitales como recordatorios prioritarios o acceso anticipado a agendas de especialistas médicos para usuarios web recurrentes.

### 4.5 Tasa de Rebote (Bounce Rate) en la Página de Inicio
* **Definición:** Porcentaje de visitantes que ingresan a la página de bienvenida de la plataforma pero la abandonan de inmediato sin interactuar ni hacer un solo clic.
* **Meta:** Menos del **30%** de rebote.
* **Análisis de Desviaciones:** Indica problemas severos en el diseño de la interfaz, tiempos excesivos de carga inicial del sitio o falta de claridad en el propósito de la página.
* **Toma de Decisiones:** Aligerar el peso visual de la página web y colocar un botón de llamado a la acción ("Agendar Cita Ahora") visible de inmediato sin necesidad de hacer scroll.