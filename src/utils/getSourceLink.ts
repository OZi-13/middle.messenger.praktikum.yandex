import { apiUrl } from '../config';

export default function userAvatar(path: string | null): string {
    if(path) return `${apiUrl}resources${path}`
    return '/public/images/no-avatar.jpg';
}