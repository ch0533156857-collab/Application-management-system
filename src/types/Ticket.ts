export interface ticket{
id: number,
subject: string,
description: string,
status_id: number | null,
priority_id: number | null,
status_name: string | null,
priority_name: string | null,
created_by: number,
assigned_to: number | null,
created_at:	string,
updated_at:	string | null
}

export interface ticketCreate{
subject: string,
description: string,
status_id: number | null,
priority_id: number | null,
assigned_to: number | null
}

export type ticketUpdate = Partial<{
    status_id: number | null;
    priority_id: number | null;
    assigned_to: number | null;
}>;
