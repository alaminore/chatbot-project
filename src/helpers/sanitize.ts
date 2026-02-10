export function sanitizeInput (input: string): string {
    const forbidden = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'EXEC', 'UNION', 'SELECT'];
    let sanitized = input;

    forbidden.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        sanitized = sanitized.replace(regex, '');
    });

    sanitized = sanitized.replace(/[;<>]/g, '');

    return sanitized.trim().slice(0, 500);
}

export function validateInput (input: string): { valid: boolean; error?: string } {
    if (!input || input.trim().length === 0) {
        return { valid: false, error: 'Input cannot be empty.'};
    }

    if (input.length > 500) {
        return { valid: false, error: 'Input too long.'};
    }

    return { valid: true};
}