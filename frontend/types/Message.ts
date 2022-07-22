

type SupachatMessage = {
    id: string;
    message: string;
    created_at: Date;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
}

export default SupachatMessage;