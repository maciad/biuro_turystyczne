import { Timestamp } from '@firebase/firestore-types';

export interface Tour {
    id?: string;
    name: string;
    destination: string;
    description: string;
    start_date: Timestamp;
    end_date: Timestamp;
    price_pln: number;
    convertedPrice?: number;
    max_visitors: number;
    current_visitors: number;
    rating: [number, number];
    isSelected?: boolean;
}