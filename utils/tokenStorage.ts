export function storeToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('Token', token);
    }
}

export function getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
        // console.log('Hit the url');
        return localStorage.getItem('Token');
    }
    return null;
}

export function clearToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('Token');
    }
}