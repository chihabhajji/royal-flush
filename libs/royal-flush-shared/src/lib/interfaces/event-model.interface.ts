import { UserType } from "./user.interface";

export interface EventType {
    id: string;
    name?: string;
    description?: string;
    date: Date;
    location?: string;
    isPublic: boolean;
    creationDate: Date;
    updatedOn: Date;
    deletionDate: Date;
    attendees: UserType[];
}